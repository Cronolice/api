import { useState, useEffect } from "react";
import "./Pokemon.css";

function Pokemon() {
    const [pokemones, setPokemones] = useState([]);
    const [cargado, setCargado] = useState(false);
    const [pagina, setPagina] = useState(0);

    const obtenerPokemon = async (nuevaPagina = 0) => {
        try {
            setCargado(true);
            const offset = nuevaPagina * 12;
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offset}`);
            if (!res.ok) {
                throw new Error("No se pudieron cargar los Pokémon.");
            }
            const data = await res.json();

            const detalles = await Promise.all(
                data.results.map(async (poke) => {
                    const resPoke = await fetch(poke.url);
                    if (!resPoke.ok) {
                        throw new Error("No se pudo cargar un Pokémon.");
                    }
                    return await resPoke.json();
                })
            );

            setPokemones((anteriores) =>
                nuevaPagina === 0 ? detalles : [...anteriores, ...detalles]
            );
            setPagina(nuevaPagina);
        } catch (err) {
            console.error(err);
        } finally {
            setCargado(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            obtenerPokemon();
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="seccion-pokemon">
            <h1>Mundo Pokémon ⚡</h1>
            {cargado ? (
                <p className="pokemon-estado">Cargando Pokémon...</p>
            ) : (
                <div className="pokemon-grid">
                    {pokemones.map((poke) => (
                        <article className="pokemon-card" key={poke.id}>
                            <img
                                className="pokemon-imagen"
                                src={poke.sprites.other["official-artwork"].front_default || poke.sprites.front_default}
                                alt={poke.name}
                            />
                            <div className="noticia-info">
                                <small>#{poke.id}</small>
                                <h3 className="pokemon-nombre">{poke.name}</h3>
                                <p>Tipo: {poke.types.map((t) => t.type.name).join(", ")}</p>
                            </div>
                        </article>
                    ))}
                </div>
            )}
            {!cargado && pokemones.length > 0 && (
                <div className="pokemon-cargar">
                    <button onClick={() => obtenerPokemon(pagina + 1)}>
                        ➕ Cargar más Pokémon
                    </button>
                </div>
            )}
        </div>
    );
}

export default Pokemon;