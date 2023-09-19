const socket = io();

const form = document.getElementsByClassName('register-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const dataForm = new FormData(e.target);
    const registerNewUser = Object.fromEntries(dataForm);

    socket.emit('registerNewUser', registerNewUser);
    socket.on('newUserCreated', (mensaje) => {
        if (mensaje === "Usuario creado correctamente") {
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
    });
    e.target.reset();
});