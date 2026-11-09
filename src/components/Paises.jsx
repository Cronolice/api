import { useState, useEffect } from "react";
import "./Paises.css";

function Paises() {
    const [paises, setPaises] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limite, setLimite] = useState(24);

    const fetchPaises = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("https://restcountries.com/v3.1/all");
            if (!res.ok) throw new Error("Error en el servidor principal");
            
            const data = await res.json();
            const normalizados = data.map((item) => ({
                code: item.cca3 || item.name?.common,
                name: item.name?.common || "Sin nombre",
                capital: item.capital?.[0] || "N/A",
                region: item.region || "N/A",
                population: item.population || 0,
                flag: item.flags?.svg || item.flags?.png
            }));

            // Orden aleatorio para variar los países al cargar
            normalizados.sort(() => Math.random() - 0.5);
            setPaises(normalizados);
        } catch {
            try {
                const resFallback = await fetch("https://raw.githubusercontent.com/mledoze/countries/master/dist/countries.json");
                if (!resFallback.ok) throw new Error("Error en el servidor de respaldo");
                
                const dataFallback = await resFallback.json();
                const normalizados = dataFallback.map((item) => ({
                    code: item.cca3 || item.name?.common,
                    name: item.name?.common || "Sin nombre",
                    capital: item.capital?.[0] || "N/A",
                    region: item.region || "N/A",
                    population: item.population || 0,
                    flag: `https://flagcdn.com/w320/${item.cca2?.toLowerCase()}.png`
                }));

                normalizados.sort(() => Math.random() - 0.5);
                setPaises(normalizados);
            } catch {
                setError("No se pudo cargar la lista de países.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchPaises();
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    const mezclarYActualizar = () => {
        const mezclados = [...paises].sort(() => Math.random() - 0.5);
        setPaises(mezclados);
        setLimite(24);
    };

    const cargarMas = () => {
        setLimite((prev) => prev + 24);
    };

    const paisesFiltrados = paises.filter((pais) =>
        pais.name.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="seccion-paises">
            <h2>🌍 Explorador de Países</h2>
            
            <div className="paises-controles">
                <input
                    className="paises-buscador"
                    type="text"
                    placeholder="Buscar país por nombre (ej: Peru, Japan)..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
                <button
                    className="paises-boton"
                    onClick={mezclarYActualizar}
                >
                    🔄 Mezclar / Nuevos Países
                </button>
            </div>

            {loading && <p className="paises-estado">Cargando datos de países...</p>}
            
            {error && (
                <div className="paises-error">
                    <p>⚠️ {error}</p>
                </div>
            )}

            {!loading && !error && (
                <>
                    <div className="paises-grid">
                        {paisesFiltrados.slice(0, limite).map((pais) => (
                            <article className="pais-card" key={pais.code}>
                                <img 
                                    className="pais-bandera"
                                    src={pais.flag} 
                                    alt={`Bandera de ${pais.name}`}
                                />
                                <div className="pais-info">
                                    <h3>{pais.name}</h3>
                                    <p>
                                        <strong>Capital:</strong> {pais.capital}
                                    </p>
                                    <p>
                                        <strong>Región:</strong> {pais.region}
                                    </p>
                                    <p>
                                        <strong>Población:</strong> {pais.population.toLocaleString()}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>

                    {limite < paisesFiltrados.length && (
                        <div className="paises-cargar">
                            <button
                                className="paises-boton-cargar"
                                onClick={cargarMas}
                            >
                                ➕ Cargar más países ({paisesFiltrados.length - limite} restantes)
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Paises;