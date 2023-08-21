const socket = io();

const form = document.getElementById('formProducts');
socket.emit('getProducts');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const dataForm = new FormData(e.target);
    const product = Object.fromEntries(dataForm);
    console.log(product)
    socket.emit('nuevoProducto', product);
    socket.on('mensajeProductoCreado', (mensaje) => {
        // Swal.fire(
        //     mensaje
        // )
        console.log(mensaje);
    });
    e.target.reset();
});