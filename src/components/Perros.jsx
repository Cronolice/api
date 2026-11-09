import { useState, useEffect } from "react";
import "./Perros.css";

function Perros() {
    const [perros, setPerros] = useState([]);
    const [cargado, setCargado] = useState(false);

    const obtenerPerros = async () => {
        try {
            setCargado(true);
            const res = await fetch("https://dog.ceo/api/breeds/image/random/9");
            const data = await res.json();
            setPerros(data.message || []);
        } catch (err) {
            console.error(err);
        } finally {
            setCargado(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            obtenerPerros();
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="seccion-perros">
            <h1>Galería de Canes 🐶</h1>
            <div className="perros-controles">
                <button onClick={obtenerPerros}>🔄 Cargar nuevos perros</button>
            </div>
            {cargado ? (
                <p className="perros-estado">Cargando imágenes...</p>
            ) : (
                <div className="perros-grid">
                    {perros.map((url, i) => (
                        <div className="perro-card" key={i}>
                            <img src={url} alt={`Perro ${i}`} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Perros;