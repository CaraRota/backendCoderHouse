import { showSuccessMessage, showErrorMessage} from './swalfire.js';

const socket = io();

const form = document.getElementById('formLogin');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const dataForm = new FormData(e.target);
    const loginData = Object.fromEntries(dataForm);

    socket.emit('loginUser', loginData);
    socket.on('userLogged', (mensaje) => {
        if (mensaje === "Usuario logueado correctamente") {
            showSuccessMessage(mensaje, 'Ingresar').then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/static/home";
                }
            })
        } else {
            showErrorMessage(mensaje);
        }
    });
    e.target.reset();
});