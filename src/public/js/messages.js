const socket = io();

const messageContainer = document.getElementById('chatAllMessages');
const messageBox = document.getElementById('chatBox');
const sendButton = document.getElementById('chatBtn');

let email;
Swal.fire({
    title: 'Identificación de usuario',
    text: 'Por favor ingrese su email',
    input: 'text',

    inputValidator: valor => {
        return !valor && 'Ingrese un email válido';
    },
    allowOutsideClick: false,
}).then(resultado => {
    socket.emit('getMessages');
    email = resultado.value;
});

sendButton.addEventListener('click', () => {
    if (messageBox.value.trim().length > 0) {
        socket.emit('mensaje', {
            email: email,
            message: messageBox.value,
        });
        messageBox.value = '';
    }
});

const sendMessage = () => {
    if (messageBox.value.trim().length > 0) {
        socket.emit('mensaje', {
            email: email,
            message: messageBox.value,
        });
        messageBox.value = '';
    }
}

messageBox.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});

socket.on('all-messages', data => {
    data.forEach(message => {
        const newMessage = document.createElement('div');
        newMessage.classList.add('message');
        newMessage.innerHTML = `
                                <div class="message">
                                <span class="user">${message.email}</span>
                                <span class="text">${message.message}</span>
                                </div>
                                `;
        messageContainer.appendChild(newMessage);
        messageContainer.scrollTop = messageContainer.scrollHeight;
    });
});

socket.on('mensajes', data => {
    const newMessage = document.createElement('div');
    newMessage.classList.add('message');
    newMessage.innerHTML = `
                            <div class="message">
                            <span class="user">${data.email}</span>
                            <span class="text">${data.message}</span>
                            </div>
                            `;
    messageContainer.appendChild(newMessage);
    messageContainer.scrollTop = messageContainer.scrollHeight;
});