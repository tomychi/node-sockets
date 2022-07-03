// Referencias del HTML
const d = document;

const lblOnline = d.querySelector('#lblOnline');
const lblOffline = d.querySelector('#lblOffline');
const txtMensaje = d.querySelector('#txtMensaje');
const btnEnviar = d.querySelector('#btnEnviar');

// socket del cliente
const socket = io();

// observadores
// on - es para estar escuchando
socket.on('connect', () => {
    // console.log('conectado');

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () => {
    // console.log('desconectado');

    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
});

socket.on('enviar-mensaje', (payload) => {
    console.log(payload);
});

btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value;

    // payload es lo q envio
    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime(),
    };

    // emitir evento del cliente al servidor
    socket.emit('enviar-mensaje', payload, (id) => {
        console.log('desde el server', id);
    });
});
