# Galería de APIs

Aplicación web desarrollada con **React** y **Vite** que reúne diferentes APIs en una sola interfaz. Incluye un dashboard inicial, navegación por secciones, diseño responsive y despliegue automático en GitHub Pages.

## Demo

- [Aplicación publicada](https://cronolice.github.io/api/)
- [Repositorio en GitHub](https://github.com/Cronolice/api)

## Explicación fácil

Esta aplicación es como un **menú de servicios**:

1. Entras a la página y ves el Inicio.
2. El menú de arriba te permite elegir una sección.
3. Cada sección se conecta a una API diferente.
4. La API devuelve información, imágenes o frases.
5. React muestra esa información en tarjetas.
6. Si la información está cargando, aparece un mensaje.
7. Si algo falla, se muestra un aviso en lugar de dejar la pantalla vacía.

Por ejemplo, cuando entras a **Pokémon**, la aplicación le pide 12 Pokémon a PokéAPI. Después muestra su imagen, nombre, número y tipos. Si pulsas **Cargar más Pokémon**, pide otros 12 y los agrega debajo de los anteriores.

### ¿Qué es una API?

Una API es una puerta que permite pedir información a otro servicio. La aplicación hace una pregunta, el servicio responde con datos y React los coloca en la página.

Ejemplo sencillo:

```text
Aplicación: "Dame 12 Pokémon"
PokéAPI: "Aquí están sus nombres, imágenes y tipos"
Aplicación: muestra tarjetas en pantalla
```

### ¿Qué hace cada parte?

- **React:** construye la pantalla y la actualiza.
- **Vite:** inicia el proyecto y prepara la versión final.
- **JavaScript:** contiene la lógica de los botones y las consultas.
- **CSS:** define colores, tamaños, tarjetas y adaptación a celulares.
- **APIs:** proporcionan los datos que aparecen en la página.
- **GitHub Actions:** construye y publica la aplicación automáticamente.

### Recorrido de un clic

Cuando pulsas **Noticias**, ocurre lo siguiente:

1. El menú cambia la sección activa.
2. `App.jsx` muestra `Noticias.jsx`.
3. `Noticias.jsx` consulta GNews.
4. La respuesta se guarda en una variable de React.
5. La pantalla se actualiza con las noticias.
6. `Noticias.css` organiza las noticias en tarjetas.

## Tecnologías

- React 19
- Vite
- JavaScript
- CSS
- GitHub Actions
- GitHub Pages

## APIs utilizadas

| Sección | Servicio | Funcionalidad |
|---|---|---|
| Noticias | [GNews](https://gnews.io/) | Titulares generales, tecnología y deportes |
| Perros | [Dog CEO API](https://dog.ceo/dog-api/) | Imágenes aleatorias de perros |
| Pokémon | [PokéAPI](https://pokeapi.co/) | Datos, imágenes y tipos de Pokémon |
| Frases | [DummyJSON](https://dummyjson.com/) y [MyMemory](https://mymemory.translated.net/) | Frases célebres traducidas al español |
| Países | [REST Countries](https://restcountries.com/) | Países, banderas, capitales, regiones y población |
| Fotos | [Unsplash](https://unsplash.com/developers) | Búsqueda y paginación de fotografías |

## Funcionalidades

- Dashboard de inicio con resumen de servicios.
- Navegación entre todas las APIs.
- Búsqueda de noticias por categoría.
- Carga de nuevas imágenes de perros.
- Carga progresiva de Pokémon en bloques de 12.
- Generación de nuevas frases traducidas.
- Búsqueda y mezcla de países.
- Búsqueda, aleatoriedad y paginación de fotos.
- Estados de carga, error y ausencia de resultados.
- Estilos separados por componente y diseño responsive.
- Footer común para toda la aplicación.

## Instalación

### Requisitos

- Node.js 22 o superior
- npm

### Pasos

```bash
git clone https://github.com/Cronolice/api.git
cd api
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_GNEWS_API_KEY=tu_clave_de_gnews
VITE_UNSPLASH_ACCESS_KEY=tu_clave_de_unsplash
```

También puedes usar [.env.example](./.env.example) como plantilla.

> Las variables que empiezan por `VITE_` se envían al frontend. No deben considerarse secretos completamente privados.

## Scripts disponibles

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run lint` | Ejecuta ESLint |
| `npm run build` | Genera la versión de producción |
| `npm run preview` | Previsualiza la compilación |

## Estructura principal

```text
api-react/
├── .github/workflows/deploy-pages.yml
├── public/
├── src/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Fotos.jsx
│   │   ├── Frases.jsx
│   │   ├── Navbar.jsx
│   │   ├── Noticias.jsx
│   │   ├── Paises.jsx
│   │   ├── Perros.jsx
│   │   └── Pokemon.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env.example
├── index.html
├── package.json
└── vite.config.js
```

## Arquitectura

### `main.jsx`

Es el punto de entrada de React. Carga los estilos globales y renderiza `App`.

### `App.jsx`

Controla la sección activa mediante el estado `seccion`. Según su valor, muestra el dashboard o el componente correspondiente.

### `Navbar.jsx`

Contiene los botones de navegación y recibe la sección actual junto con la función para cambiarla.

### Componentes de APIs

Cada API está aislada en su propio componente y archivo CSS. Esto facilita el mantenimiento y evita mezclar estilos o lógica entre secciones.

### Dashboard

La pantalla de Inicio muestra:

- Resumen de APIs conectadas.
- Estado general de los servicios.
- Tarjetas de acceso rápido a cada sección.

## Explicación del código

### Punto de entrada de React

En [src/main.jsx](./src/main.jsx) se obtiene el elemento `root` de `index.html` y se monta el componente principal:

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

`StrictMode` ayuda a detectar problemas durante el desarrollo. `App` contiene la interfaz completa de la aplicación.

### Navegación con estado

En [src/App.jsx](./src/App.jsx), el estado `seccion` determina qué componente se muestra:

```jsx
const [seccion, setSeccion] = useState("Inicio");

{seccion === "Inicio" && <Dashboard />}
{seccion === "Noticias" && <Noticias />}
{seccion === "Pokemon" && <Pokemon />}
```

El componente `Navbar` recibe `setSeccion` como propiedad. Cuando el usuario pulsa un botón, cambia el estado y React actualiza únicamente la vista necesaria.

### Consulta de una API

Los componentes utilizan `fetch` dentro de funciones asíncronas. Por ejemplo, Pokémon solicita una lista y después consulta los detalles de cada elemento:

```jsx
const obtenerPokemon = async (nuevaPagina = 0) => {
  setCargado(true);

  const offset = nuevaPagina * 12;
  const respuesta = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offset}`
  );

  if (!respuesta.ok) {
    throw new Error("No se pudieron cargar los Pokémon.");
  }

  const datos = await respuesta.json();
  const detalles = await Promise.all(
    datos.results.map(async (pokemon) => {
      const respuestaDetalle = await fetch(pokemon.url);
      return respuestaDetalle.json();
    })
  );

  setPokemones((anteriores) =>
    nuevaPagina === 0 ? detalles : [...anteriores, ...detalles]
  );
  setCargado(false);
};
```

El parámetro `offset` permite paginar. Los nuevos resultados se agregan al estado anterior usando el operador `...`, por eso el botón **Cargar más Pokémon** no elimina los resultados existentes.

### Estados de carga y error

Cada componente mantiene estados para representar el ciclo de una petición:

```jsx
const [datos, setDatos] = useState([]);
const [cargando, setCargando] = useState(false);
const [error, setError] = useState(null);
```

La petición activa `cargando`, guarda los datos cuando termina y muestra un mensaje si ocurre un error. Esto evita que la interfaz parezca bloqueada mientras se espera la respuesta.

### Variables de entorno

Las claves se leen mediante `import.meta.env`:

```jsx
const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;
```

Vite solo expone al frontend las variables que empiezan por `VITE_`. El archivo `.env` se mantiene fuera del repositorio mediante `.gitignore`, mientras que `.env.example` documenta los nombres necesarios.

### Estilos por componente

Cada sección importa su propio archivo CSS:

```jsx
import "./Pokemon.css";
```

Por ejemplo, `Pokemon.css` define la rejilla, las tarjetas, las imágenes y el botón para cargar más resultados. Esta organización evita que los estilos de una API afecten a otra.

## Procedimiento completo

### 1. Crear el proyecto

Se crea una aplicación React con Vite y se instalan las dependencias:

```bash
npm create vite@latest api-react -- --template react
cd api-react
npm install
```

### 2. Organizar los componentes

Se separan las responsabilidades:

1. `App.jsx` controla la navegación.
2. `Navbar.jsx` muestra el menú.
3. Cada archivo `*.jsx` consulta una API.
4. Cada componente tiene su archivo `*.css`.
5. `Footer.jsx` se muestra en todas las secciones.

### 3. Conectar las APIs

Para cada servicio se implementa el siguiente proceso:

1. Definir estados con `useState`.
2. Crear una función asíncrona.
3. Ejecutar `fetch` con la URL de la API.
4. Verificar `response.ok`.
5. Convertir la respuesta con `response.json()`.
6. Guardar los datos en el estado.
7. Mostrar carga, resultados o error.

### 4. Configurar las claves

Se copia `.env.example` como `.env` y se completan las claves:

```bash
copy .env.example .env
```

Después se inicia el servidor:

```bash
npm run dev
```

La aplicación queda disponible normalmente en `http://localhost:5173`.

### 5. Revisar la calidad

Antes de publicar se ejecutan:

```bash
npm run lint
npm run build
```

`lint` revisa errores de JavaScript y React. `build` comprueba que Vite pueda generar correctamente los archivos de producción.

### 6. Configurar GitHub Pages

En [vite.config.js](./vite.config.js) se establece la ruta base:

```js
export default defineConfig({
  base: "/api/",
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
});
```

El workflow de [GitHub Actions](./.github/workflows/deploy-pages.yml) se ejecuta después de cada `push` a `main`. Instala las dependencias, genera `dist` y publica esa carpeta como sitio de Pages.

### 7. Publicar cambios

El procedimiento para actualizar el sitio es:

```bash
git add .
git commit -m "Describe el cambio"
git push origin main
```

Después del `push`, GitHub Actions ejecuta el despliegue automáticamente. Cuando el workflow termina correctamente, los cambios aparecen en:

```text
https://cronolice.github.io/api/
```

## Despliegue en GitHub Pages

El archivo [.github/workflows/deploy-pages.yml](./.github/workflows/deploy-pages.yml) ejecuta el despliegue automáticamente cada vez que se hace `push` a `main`.

El flujo:

1. Descarga el código.
2. Instala Node.js y las dependencias.
3. Ejecuta `npm run build`.
4. Publica la carpeta `dist`.

En [vite.config.js](./vite.config.js) se define:

```js
base: '/api/'
```

Esto permite que Vite genere correctamente las rutas para:

```text
https://cronolice.github.io/api/
```

## Validación

Antes de publicar se ejecutan:

```bash
npm run lint
npm run build
```

Ambos comandos se encuentran funcionando correctamente.
