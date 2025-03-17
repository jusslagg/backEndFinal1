# ProyectoFinalBackend1

Un proyecto backend para gestionar productos y carritos.

## Instalación

1.  Clona el repositorio.
2.  Instala las dependencias usando `npm install`.
3.  Crea un archivo `.env` con la cadena de conexión de MongoDB:

    ```
    MONGODB_URI=mongodb://localhost:27017/proyectoVideojuegos
    ```

## Uso

1.  Inicia el servidor usando `node src/app.js`.
2.  Abre la aplicación en un navegador en `http://localhost:8080`.

## Endpoints de la API

*   `/api/products` (POST, PUT, DELETE) - Gestionar productos.
*   `/carts/:cid` (GET, DELETE, PUT) - Gestionar carritos.

## Tecnologías Utilizadas

*   Express
*   Handlebars
*   Mongoose
*   Tailwind CSS
*   DaisyUI