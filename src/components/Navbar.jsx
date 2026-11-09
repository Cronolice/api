import "./Navbar.css";

function Navbar({ seccion, cambiarSeccion }) {
    const opciones = [
        { id: "Inicio", label: "🏠 Inicio" },
        { id: "Noticias", label: "📰 Noticias" },
        { id: "Perros", label: "🐶 Perros" },
        { id: "Pokemon", label: "⚡ Pokémon" },
        { id: "Frases", label: "💬 Frases" },
        { id: "Paises", label: "🌍 Países" },
        { id: "Fotos", label: "📷 Fotos" }
    ];

    return (
        <nav className="navbar">
            <div className="logo">
                <span>📦 Galería de APIs</span>
            </div>
            <div className="nav-links">
                {opciones.map((opcion) => (
                    <button
                        key={opcion.id}
                        className={seccion === opcion.id ? "selecionado" : ""}
                        onClick={() => cambiarSeccion(opcion.id)}
                    >
                        {opcion.label}
                    </button>
                ))}
            </div>
        </nav>
    );
}

export default Navbar;