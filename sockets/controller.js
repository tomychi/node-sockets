const socketsController = (socket) => {
    console.log('Cliente conectado', socket.id);

    socket.on('disconnect', () => {
        // console.log('Cliente desconectado');
    });

    // payload es lo q viene en el mensaje
    socket.on('enviar-mensaje', (payload, callback) => {
        // async para guardar en DB

        // cuando hacemos comunicacion con la DB
        // recomendacion mandar objetos
        const id = 123456;
        callback(id);

        //mandar mensaje a todos los clientes desde el servidor
        socket.broadcast.emit('enviar-mensaje', payload);
        // broadcast le envia mensajes a todos los otros clientes menos el q lo envio
    });
};

module.exports = {
    socketsController,
};
