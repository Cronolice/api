import { useState, useEffect } from "react";
import "./Fotos.css";

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

function Fotos() {
    const [query, setQuery] = useState("tecnologia");
    const [fotos, setFotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagina, setPagina] = useState(1);

    const buscarFotos = async (termino, numPagina = 1, acumular = false) => {
        if (!termino.trim()) return;
        if (!UNSPLASH_ACCESS_KEY) {
            setError("Falta configurar VITE_UNSPLASH_ACCESS_KEY en el archivo .env.");
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(
                `https://api.unsplash.com/search/photos?page=${numPagina}&per_page=12&query=${encodeURIComponent(termino)}&client_id=${UNSPLASH_ACCESS_KEY}`
            );
            
            if (!res.ok) {
                throw new Error(`Error ${res.status}: Clave no válida o límite de peticiones superado.`);
            }

            const data = await res.json();
            const nuevasFotos = data.results || [];
            
            if (acumular) {
                setFotos((prev) => [...prev, ...nuevasFotos]);
            } else {
                setFotos(nuevasFotos);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            buscarFotos("tecnologia", 1, false);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setPagina(1);
        buscarFotos(query, 1, false);
    };

    const cargarMasFotos = () => {
        const siguientePagina = pagina + 1;
        setPagina(siguientePagina);
        buscarFotos(query, siguientePagina, true);
    };

    const cargarFotosAleatorias = () => {
        const paginaRandom = Math.floor(Math.random() * 10) + 1;
        setPagina(paginaRandom);
        buscarFotos(query, paginaRandom, false);
    };

    return (
        <div className="seccion-fotos">
            <h2>📷 Buscador de Fotos (Unsplash)</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
                <input
                    type="text"
                    placeholder="Buscar imágenes..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ flex: 1, minWidth: "200px", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
                <button type="submit" style={{ padding: "10px 20px", cursor: "pointer", borderRadius: "6px" }}>
                    🔍 Buscar
                </button>
                <button 
                    type="button" 
                    onClick={cargarFotosAleatorias} 
                    style={{ padding: "10px 15px", cursor: "pointer", borderRadius: "6px", backgroundColor: "#6c757d", color: "#fff", border: "none" }}
                >
                    🎲 Nuevas Fotos
                </button>
            </form>

            {loading && fotos.length === 0 && <p style={{ textAlign: "center" }}>Cargando fotografías...</p>}
            {error && <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>}

            {fotos.length > 0 && (
                <>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                        gap: "15px"
                    }}>
                        {fotos.map((foto, index) => (
                            <div key={`${foto.id}-${index}`} style={{ border: "1px solid #eee", borderRadius: "8px", overflow: "hidden", backgroundColor: "#fff" }}>
                                <img
                                    src={foto.urls.small}
                                    alt={foto.alt_description || "Foto Unsplash"}
                                    style={{ width: "100%", height: "180px", objectFit: "cover", display: "block" }}
                                />
                                <div style={{ padding: "8px", fontSize: "12px", color: "#666" }}>
                                    Foto por{" "}
                                    <a 
                                        href={`${foto.user.links.html}?utm_source=galeria_apis&utm_medium=referral`} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        style={{ color: "#000", fontWeight: "bold" }}
                                    >
                                        {foto.user.name}
                                    </a>{" "}
                                    en{" "}
                                    <a 
                                        href="https://unsplash.com/?utm_source=galeria_apis&utm_medium=referral" 
                                        target="_blank" 
                                        rel="noreferrer"
                                        style={{ color: "#000" }}
                                    >
                                        Unsplash
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: "center", marginTop: "25px" }}>
                        <button
                            onClick={cargarMasFotos}
                            disabled={loading}
                            style={{
                                padding: "12px 24px",
                                fontSize: "15px",
                                fontWeight: "bold",
                                cursor: loading ? "not-allowed" : "pointer",
                                borderRadius: "8px",
                                border: "none",
                                backgroundColor: "#28a745",
                                color: "#fff"
                            }}
                        >
                            {loading ? "Cargando..." : "➕ Cargar más fotos"}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Fotos;