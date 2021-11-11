# Proyecto Frontend React
## Solicitan desde GeeksHubs Academy realizar un frontend para el proyecto de API realizado en el repositorio https://github.com/aramossanchez/Proyecto_VideoClub_API.
***
![Vista Inicial APP React](/frontend/src/screenshots/screenshot.jpg)
***

## Pre-requisitos del proyecto para hacerlo funcionar en tu equipo local:

* Instalar **Nodejs** en nuestro equipo, descargándolo de su página oficial
https://nodejs.org/

* Clonar el proyecto en nuestro equipo con git bash:
```
$git clone 'url-del-repositorio'
```

* Instalar todas las dependecias con el siguiente comando:
```
npm install
```

* Arrancamos el servidor con el siguiente comando:
```
npm run start
```

## Tecnologías utilizadas en el proyecto:

* **react**: Instalamos react en nuestro proyecto:
```
npm install react
```
* **react-router-dom**: Instalamos react-router-dom en nuestro proyecto, para poder alternar entre vistas en nuestra aplicación:
```
npm install react-router-dom
```
* **axios**: Instalamos axios en nuestro proyecto, para poder hacer consultas a la API:
```
npm install axios
```
* **redux**: Instalamos redux en nuestro proyecto, para poder usar redux (centralización del estado):
```
npm install redux
```
* **react-redux**: Instalamos react-redux en nuestro proyecto (relaciona react y redux):
```
npm install react-redux
```

## Explicación de la estructura del proyecto

El directorio **src** es donde está almacenada toda la aplicación. En este directorio se encuentra lo siguiente:

* **index.js**: Este es el archivo principal. Desde aquí se llama a **<App/>**, que es donde se ejecutará toda la aplicación.

* **app.js**: En este archivo es donde se gestionan los diferentes **Containers** de la aplicación.

* **Redux**: En este directorio guardamos toda la configuración de redux de la aplicación.
    * **store.js**: En este archivo se encuentra el estado general de la aplicación.
    * **types.js**: En este archivo se encuentran los nombres de los types que pasamos por action al reducer.
    * **reducers**: En este directorio se encuentran todos los reducers que modifican el estado:
        * **index**: En este archivo combinamos todos los reducers, para conseguir la centralización deseada de estados con redux.
        * **datosLogin-reducer**: En este archivo tenemos las funciones que editan el estado de redux para los types LOGIN, LOGOUT y ACTUALIZA_DATOS_LOGIN.

* **Containers**: En este directorio es donde se guardarán las diferentes vistas:
    * **Inicio**: Es la página principal, donde se ve un pequeño mensaje de bienvenida, el header y la ventana de login.
    * **Contacto**: Es la página en la que se podrá contactar con el administrador de la aplicación. Se puede mandar los datos de usuario para dar de alta un usuario nuevo.
    * **Tu Zona**: Es la página de gestión, donde el usuario podrá acceder a las diferentes funcionalidades de la aplicación.
    * **Perfil**: Es la página en la que el usuario podrá consultar sus datos guardados en la base de datos, actualizarlos o borrar su perfil.
    * **Películas**: Es la página donde se pueden ver todas las películas de la base de datos. Se pueden filtrarlas por ciudades, hacer búsqueda por título, por género y por protagonista.
    * **PeliculasDisponibles**: Es la página donde se mostrarán las películas que se encuentran en la ciudad del usuario logueado, y además que no estén alquiladas.
    * **RegistroUsuarios**: Es la página donde se crea nuevos usuarios (solo para usuario con permisos de administrador).
    * **BuscarUsuario**: Es la página en la que se puede buscar usuario por ID. Además, se puede modificar los datos de ese usuario en la base de datos y también se puede borrar el registro de la base de datos. 
    
    * **Admin**: Es la página donde se puede acceder únicamente cuando se inicia sesión como administrador. Se puede registrar usuarios, buscar usuarios por id, actualizarlos, borrarlos, ver listado completo de usuarios.
* **Components**: En este directorio es donde se guardan todos los componentes que se usarán en todas las vistas:
    * **Lateral**: Es el menú que aparece en la parte lateral de la aplicación cuando nos logamos.
* **img**: En este directorio se guardan todas las imágenes que se usarán en la aplicación.