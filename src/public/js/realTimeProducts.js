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
        if (mensaje === "Producto creado correctamente") {
            Swal.fire({
                icon: 'success',
                title: mensaje,
                showConfirmButton: true,
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: mensaje,
                showConfirmButton: true,
            })
        }
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
            <td><button class="delete-btn" data-id="${product._id}">Eliminar</button></td>
        </tr>
        `);
    }).join(" ");
    document.getElementById('products').innerHTML = html;
});

const getProds = document.getElementById('products')
getProds.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const id = e.target.dataset.id;
        socket.emit('eliminarProducto', id);
        socket.on('mensajeProductoEliminado', (mensaje) => {
            if (mensaje === "Producto eliminado correctamente") {
                Swal.fire({
                    icon: 'success',
                    title: mensaje,
                    showConfirmButton: true,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: mensaje,
                    showConfirmButton: true,
                });
            }
        });
    }
});





































// socket.on('mensajeProductoEliminado', (mensaje) => {
//     if (mensaje === "Producto eliminado correctamente") {
//         Swal.fire({
//             icon: 'success',
//             title: mensaje,
//             showConfirmButton: true,
//         });
//     } else {
//         Swal.fire({
//             icon: 'error',
//             title: mensaje,
//             showConfirmButton: true,
//         });
//     }
// });