import { showErrorMessage, showSuccessMessage } from "./swalfire.js";

const socket = io();

const form = document.getElementById('formRegister');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const dataForm = new FormData(e.target);
    const registerNewUser = Object.fromEntries(dataForm);

    socket.emit('registerNewUser', registerNewUser);
    socket.on('newUserCreated', (mensaje) => {
        if (mensaje === "Usuario creado correctamente") {
            showSuccessMessage(mensaje, 'Iniciar sesión').then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/static/login";
                }
            })
        } else {
            showErrorMessage(mensaje);
        }
    });
    e.target.reset();
});