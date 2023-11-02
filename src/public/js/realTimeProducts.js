import { showErrorMessage, showSuccessMessage } from "./swalfire.js";

const socket = io();

socket.emit('getProducts')
const form = document.getElementById('formProducts');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const dataForm = new FormData(e.target);
    const product = Object.fromEntries(dataForm);
    socket.emit('nuevoProducto', product);
    socket.on('mensajeProductoCreado', (mensaje) => {
        if (mensaje === "Producto creado correctamente") {
            showSuccessMessage(mensaje);
        } else {
            showErrorMessage(mensaje);
        }
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
            <td>${product.category}</td>
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
                showSuccessMessage(mensaje);
            } else {
                showErrorMessage(mensaje);
            }
        });
    }
});