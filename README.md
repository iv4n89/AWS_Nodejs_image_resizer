# Image resizer con AWS Lambda

## Cómo levantar el proyecto:

Para levantar el proyecto, necesitaremos atender antes al fichero `.env.example`. Será necesario crear una copia de este fichero, sin la extensión `.example` y darle valor a la variable de `CLOUD_ENDPOINT`, que será el endpoint del servicio cloud que funcione como función serverless.

Podemos crear una copia de este fichero con el comando:

```
$ cp .env.example .env
```

El fichero `.env.example` viene con un `puerto` para correr el servidor por defecto (`3000`). Sin embargo, podremos modificarlo para correr `express` en el puerto que sea más conveniente.

Se provee además en el `.env.example` de un valor por defecto para las variables necesarias de la base de datos `MongoDb`, que podremos modificar a conveniencia.

Una vez tenemos todo preparado, levantaremos el servidor de `MongoDB` con `Docker` usando el comando:

```
$ docker-compose up -d
```

Si dejamos las credenciales por defecto que encontramos en el ejemplo, podremos acceder a `MongoDb` usando:

```
mongodb://root:secr3t!@localhost:27017
```

<br/>

## Estructura del proyecto

El proyecto actual se trata de un servidor `NodeJS` corriendo un `Express`, con `Typescript` como lenguaje.

Este proyecto se divide en varias carpetas, cada una con una finalidad concreta:

`__tests__` -> Encontraremos tests de funcionalidades básicas de la aplicación

`controllers` -> Controladores de la aplicación. Encapsulan la lógica de manejo de los requests, así como la respuesta que le legará al usuario.

`Database` -> En esta carpeta tendremos la definición del objeto de conexión de MongoDb.

`models` -> Modelos y _schemas_ de _Mongoose_, que serán usados además como repositorios.

`output` -> Encontraremos las imágenes redimensionadas, recibidas desde el servicio serverless que estemos usando. Estarán estructuradas como `nombre de la imagen original` -> `tamaño` -> `md5`.extension

`routes` -> Definición de las rutas de endpoints, que harán uso de las funciones exportadas por los controladores

`Server` -> Clase Server que encapsula la lógina necesaria ejecutar el servidor de _Express_

`services` -> Encapsulan la lógica de negocio, necesaria para ejecutar los procesos necesarios con el request llegado al controlador y generar los datos a enviar de vuelta con el response.

`util` -> Funciones de utilidad que serán usadas por los servicios


## Flujo de datos del proyecto

### Se crea un nuevo task

![Flow](./Documentation/flujo-image.png)