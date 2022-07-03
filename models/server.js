const express = require('express');
const cors = require('cors');

const { socketsController } = require('../sockets/controller');

class Server {
    // me creo el app aqui
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        //server de socket
        this.server = require('http').createServer(this.app);
        // toda la informacion de los clientes
        this.io = require('socket.io')(this.server);

        // rutas
        this.paths = {};

        // conectar a base de datos

        // Middlewares (funciones que aniaden mas funcionalidades)
        this.middlewares();

        // llamo a las rutas de mi aplicacion
        this.routes();

        // manejo de eventos Scokets
        this.sockets();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // directorio publico
        this.app.use(express.static('public'));
    }

    // defino las rutas
    routes() {
        // this.app.use(this.paths.auth, require('../routes/auth'));
    }

    sockets() {
        this.io.on('connection', socketsController);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('servidor corriendo en el puerto', this.port);
        });
    }
}

module.exports = Server;
