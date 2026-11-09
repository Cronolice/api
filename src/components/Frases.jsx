import { useState, useEffect } from "react";
import "./Frases.css";

function Frases() {
    const [frases, setFrases] = useState([]);
    const [cargado, setCargado] = useState(false);
    const [error, setError] = useState(null);

    const obtenerFrases = async () => {
        setCargado(true);
        setError(null);

        // Salto aleatorio para solicitar un grupo de frases distinto en cada clic
        const randomSkip = Math.floor(Math.random() * 140);

        try {
            // 1. Obtener 9 frases aleatorias de la API
            const res = await fetch(`https://dummyjson.com/quotes?limit=9&skip=${randomSkip}`, {
                cache: "no-store"
            });

            if (!res.ok) throw new Error(`Error HTTP ${res.status}`);

            const data = await res.json();
            
            if (!data.quotes || data.quotes.length === 0) {
                throw new Error("No se encontraron frases");
            }

            // 2. Traducir dinámicamente cada frase al español con MyMemory API
            const frasesTraducidas = await Promise.all(
                data.quotes.map(async (item) => {
                    try {
                        const resTrans = await fetch(
                            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(item.quote)}&langpair=en|es`
                        );
                        const dataTrans = await resTrans.json();
                        return {
                            id: item.id,
                            quote: dataTrans.responseData?.translatedText || item.quote,
                            author: item.author
                        };
                    } catch {
                        return item;
                    }
                })
            );

            setFrases(frasesTraducidas);
        } catch (err) {
            console.warn("Error al consultar la API:", err);
            setError("No se pudieron obtener o traducir las frases en este momento.");
        } finally {
            setCargado(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            obtenerFrases();
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="noticias">
            <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                marginBottom: "20px", 
                flexWrap: "wrap", 
                gap: "10px" 
            }}>
                <h1 style={{ margin: 0 }}>Frases Célebres 💬</h1>
                <button
                    onClick={obtenerFrases}
                    disabled={cargado}
                    style={{
                        padding: "10px 16px",
                        borderRadius: "6px",
                        border: "none",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        cursor: cargado ? "not-allowed" : "pointer",
                        fontWeight: "bold"
                    }}
                >
                    🔄 Generar Nuevas Frases
                </button>
            </div>

            {cargado ? (
                <p style={{ textAlign: "center" }}>Cargando y traduciendo frases al español...</p>
            ) : error ? (
                <div style={{ textAlign: "center", color: "red" }}>
                    <p>{error}</p>
                    <button onClick={obtenerFrases} style={{ padding: "8px 12px", cursor: "pointer" }}>
                        Reintentar
                    </button>
                </div>
            ) : (
                <div className="noticias-grid">
                    {frases.map((item) => (
                        <div className="noticias-card" key={item.id}>
                            <div className="noticia-info">
                                <h3>"{item.quote}"</h3>
                                <small>— {item.author}</small>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Frases;