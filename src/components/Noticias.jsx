import { useState, useEffect } from "react";
import "./Noticias.css";

const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

function Noticias() {
    const [noticias, setNoticias] = useState([]);
    const [categoria, setCategoria] = useState("general");
    const [cargado, setCargado] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const obtenerNoticias = async () => {
            try {
                setCargado(true);
                setError(null);
                const url = `https://gnews.io/api/v4/top-headlines?category=${categoria}&lang=es&country=pe&max=10&apikey=${API_KEY}`;
                const respuesta = await fetch(url);
                const datos = await respuesta.json();
                
                if (!respuesta.ok) {
                    throw new Error("No se puede cargar las noticias");
                }
                setNoticias(datos.articles || []);
            } catch (err) {
                setError(err.message);
                setNoticias([]);
            } finally {
                setCargado(false);
            }
        };
        obtenerNoticias();
    }, [categoria]);

    return (
        <div className="noticias">
            <h1>Últimas noticias 📰</h1>
            <div className="categoria">
                <button className={categoria === "general" ? "activa" : ""} onClick={() => setCategoria("general")}>🌎 General</button>
                <button className={categoria === "technology" ? "activa" : ""} onClick={() => setCategoria("technology")}>🤖 Tecnología</button>
                <button className={categoria === "sports" ? "activa" : ""} onClick={() => setCategoria("sports")}>⛹🏻 Deportes</button>
            </div>
            
            {cargado && <p className="estado-noticias">Cargando las últimas noticias...</p>}
            {error && (
                <div className="error">
                    <strong>No fue posible cargar las noticias</strong>
                    <span>{error}</span>
                </div>
            )}
            
            {!cargado && !error && (
                <div className="noticias-grid">
                    {noticias.length > 0 ? noticias.map((noticia, i) => (
                        <div className="noticias-card" key={noticia.url || i}>
                            <img src={noticia.image || "https://placehold.co/600x400?text=Noticia"} alt={noticia.title} />
                            <div className="noticia-info">
                                <small>{noticia.source?.name || "Fuente"}</small>
                                <h3>{noticia.title}</h3>
                                <p>{noticia.description}</p>
                                <a href={noticia.url} target="_blank" rel="noreferrer">Leer más ...</a>
                            </div>
                        </div>
                    )) : <p className="estado-noticias">No hay noticias disponibles para esta categoría.</p>}
                </div>
            )}
        </div>
    );
}

export default Noticias;