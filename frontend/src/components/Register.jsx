import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Container, CssBaseline, Alert } from '@mui/material';

//RRD
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleRegister = async () => {
        setIsLoading(true);
        setError("");

        if (firstName === '' || lastName === '' || email === '' || password === '' || age === '') {
            setError("Todos los campos son obligatorios");
            setIsLoading(false)
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/api/session/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ first_name: firstName, last_name: lastName, email: email, password: password, age: age }),
            });

            if (response.ok) {
                navigate('/login');
            } else {
                // Handle registration failure (username already exists, etc.)
                console.error('Registration failed!');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Container component="main" maxWidth="xs" style={{ marginTop: '1.2rem' }}>
                <CssBaseline />
                {error && <Alert style={{ marginTop: '1.2rem' }} severity="error">{error}</Alert>}
                <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1.2rem' }}>
                    <Typography variant="h5">Registrarse</Typography>
                    <TextField
                        label="Nombre"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        label="Apellido"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        label="Edad"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleRegister}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Registrando...' : 'Registrarse'}
                    </Button>
                    <Typography variant="body2" style={{ marginTop: '10px' }}>
                        Ya tienes una cuenta?{' '}
                        <Link to="/login" style={{ color: 'blue' }}>
                            Inicia sesion
                        </Link>
                    </Typography>
                </Paper>
            </Container>
        </>
    );
};

export default Register;