imagen

Entiendo que una imagen de docker es como una plantilla para correr mi aplicación, esto crea o simula un entorno donde está lo necesario para que pueda correrse allí.


dockerfile.frontend/.backend

Aquí cree la imagen que voy a usar para el front
-FROM node:24-alpine AS builder: Aquí indico que imagen quiero como base, diciendo versión de node y distribución de linux que es muy ligera y builder para esta etapa de construcción con multi-stage build.
-WORKDIR /app: Esta línea indico cual va a ser el directorio de trabajo, se llamará app.
-COPY package*.json ./: COPY es la instrucción de docker para mover archivos o directorios, después le digo que todo lo que busque todo lo que inicia package y lo que termine en .json, ./ le dice el directorio donde buscar. Este comando es para que docker no vuelva a instalar todas las dependencias desde cero, en vez de eso, detectará los cambios y así no tendra que empezar desde el inicio, va primero que COPY . ./ porque es una instrucción, si se pusiera al reves siempre se instalaria todo siempre que arranque docker, que es lo que se busca evitar con esto
-COPY . ./ : Acá copio el directorio ./
-CMD ["node", "src/index.js"]: Este ya es el comando de arranque, el que define que se ejecuta cuando inicie el contenedor, importante que vaya dentro de[], si no se vuelve un contenedor zombie.CMD es la instrucción por defecto, puede ser cambiada por RUN o ENTRYPOINT que son mas dificiles de cambiar. Después le digo que src es donde vive el código e index.js es el archivo que ejecuta la logíca inicial.
