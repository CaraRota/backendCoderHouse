const socket = io();

socket.emit('getProducts')
const form = document.getElementById('formProducts');

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

socket.on('productos', (products) => {
    const html = products.map((product) => {
        return (`
        <tr>
            <td>${product.title}</td>
            <td>${product.code}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
        </tr>
        `);
    }).join(" ");
    document.getElementById('products').innerHTML = html;
});