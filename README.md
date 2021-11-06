# Proyecto Frontend React
## Nos solicitan desde GeeksHubs Academy realizar un frontend para el proyecto de API realizado en el repositorio https://github.com/aramossanchez/Proyecto_VideoClub_API.
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

## Explicación de la estructura del proyecto

El directorio **src** es donde tendremos almacenada toda nuestra aplicación. En este directorio tenemos lo siguiente:

* **index.js**: Este es el archivo principal. Desde aquí llamamos a **<App/>**, que es donde se ejecutará toda nuestra aplicación.

* **app.js**: En este archivo es donde gestionaremos los diferentes **Containers** de nuestra aplicación, así como diferentes **Components**.