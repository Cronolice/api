# Galería de APIs

Aplicación web desarrollada con **React** y **Vite** que reúne diferentes APIs en una sola interfaz. Incluye un dashboard inicial, navegación por secciones, diseño responsive y despliegue automático en GitHub Pages.

## Demo

- [Aplicación publicada](https://cronolice.github.io/api/)
- [Repositorio en GitHub](https://github.com/Cronolice/api)

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
