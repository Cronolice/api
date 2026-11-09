import { useState } from "react";
import Navbar from "./components/Navbar";
import Noticias from "./components/Noticias";
import Perros from "./components/Perros";
import Pokemon from "./components/Pokemon";
import Frases from "./components/Frases";
import Paises from "./components/Paises";
import Fotos from "./components/Fotos";
import Footer from "./components/Footer";
import "./App.css";

function App() {
    const [seccion, setSeccion] = useState("Inicio");
    const apiCards = [
        { id: "Noticias", icon: "📰", nombre: "Noticias", descripcion: "Titulares y actualidad en tiempo real.", estado: "Activa", color: "azul" },
        { id: "Perros", icon: "🐶", nombre: "Perros", descripcion: "Galería de imágenes aleatorias de perros.", estado: "Activa", color: "verde" },
        { id: "Pokemon", icon: "⚡", nombre: "Pokémon", descripcion: "Datos e imágenes de la PokéAPI.", estado: "Activa", color: "amarillo" },
        { id: "Frases", icon: "💬", nombre: "Frases", descripcion: "Frases célebres traducidas al español.", estado: "Activa", color: "morado" },
        { id: "Paises", icon: "🌍", nombre: "Países", descripcion: "Información, banderas y población.", estado: "Activa", color: "turquesa" },
        { id: "Fotos", icon: "📷", nombre: "Fotos", descripcion: "Buscador de imágenes de Unsplash.", estado: "Activa", color: "rosa" }
    ];

    return (
        <div className="app">
            <Navbar seccion={seccion} cambiarSeccion={setSeccion} />
            <main className="contenido">
                {seccion === "Inicio" && (
                    <div className="dashboard">
                        <section className="dashboard-hero">
                            <div>
                                <span className="dashboard-eyebrow">CENTRO DE CONTROL</span>
                                <h1>Bienvenido a tu Galería de APIs 🚀</h1>
                                <p>Consulta, explora y descubre datos de diferentes servicios desde un solo lugar.</p>
                            </div>
                            <div className="dashboard-orb" aria-hidden="true">{"{ }"}</div>
                        </section>

                        <section className="dashboard-stats" aria-label="Resumen de APIs">
                            <div className="stat-card">
                                <span className="stat-icon">🔌</span>
                                <div><strong>6</strong><span>APIs conectadas</span></div>
                            </div>
                            <div className="stat-card">
                                <span className="stat-icon">✅</span>
                                <div><strong>100%</strong><span>Servicios disponibles</span></div>
                            </div>
                            <div className="stat-card">
                                <span className="stat-icon">🧭</span>
                                <div><strong>6</strong><span>Experiencias para explorar</span></div>
                            </div>
                        </section>

                        <section className="api-section">
                            <div className="section-heading">
                                <div>
                                    <span className="dashboard-eyebrow">SERVICIOS DISPONIBLES</span>
                                    <h2>Explora tus APIs</h2>
                                </div>
                                <span className="online-indicator"><i /> En línea</span>
                            </div>
                            <div className="api-grid">
                                {apiCards.map((api) => (
                                    <button
                                        className="api-card"
                                        key={api.nombre}
                                        onClick={() => setSeccion(api.id)}
                                    >
                                        <span className={`api-card-icon ${api.color}`}>{api.icon}</span>
                                        <span className="api-card-content">
                                            <strong>{api.nombre}</strong>
                                            <span>{api.descripcion}</span>
                                        </span>
                                        <span className="api-card-footer">
                                            <small><i /> {api.estado}</small>
                                            <b>→</b>
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </section>
                    </div>
                )}
                {seccion === "Noticias" && <Noticias />}
                {seccion === "Perros" && <Perros />}
                {seccion === "Pokemon" && <Pokemon />}
                {seccion === "Frases" && <Frases />}
                {seccion === "Paises" && <Paises />}
                {seccion === "Fotos" && <Fotos />}
            </main>
            <Footer />
        </div>
    );
}

export default App;