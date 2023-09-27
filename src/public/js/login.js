import { showSuccessMessage, showErrorMessage } from './swalfire.js';

const form = document.getElementById('formLogin');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const dataForm = new FormData(form);

    const obj = {};

    dataForm.forEach((value, key) => obj[key] = value);
    fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(result => result.json())
        .then(response => {
            console.log('Server Response:', response); // Log the entire response object for debugging

            // Adjust your code to handle the actual response structure from the server
            if (response.payload && response.payload._id) {
                showSuccessMessage('Login successful', 'Acceder')
                    .then(() => {
                        window.location.replace('/static/home');
                    });
            } else {
                showErrorMessage('Login failed');
            }
        })
        .catch(error => {
            console.error('Fetch Error:', error);
            showErrorMessage('An error occurred while logging in.');
        });
});