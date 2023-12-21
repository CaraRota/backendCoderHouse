import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Container, CssBaseline, Alert } from '@mui/material';

//RRD
import { Link } from 'react-router-dom';
import { set } from 'mongoose';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setIsLoading(true);
        setError("");
        try {
            // You can perform your login/authentication logic here
            console.log('Logging in with:', { email, password });
            // Example: Send credentials to the server for authentication
            const response = await fetch('http://localhost:3000/api/session/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Successful login, you may redirect or perform other actions here
                console.log('Login successful!');
            } else {
                // Handle login failure (incorrect credentials, etc.)
                setError("Email o contraseña incorrectos");
            }
        } catch (error) {
            setError("Error durante el login");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: '1.2rem' }}>
            <CssBaseline />
            {error && <Alert style={{ marginTop: '1.2rem' }} severity="error">{error}</Alert>}
            <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1.2rem' }}>
                <Typography variant="h5">Login</Typography>
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
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? 'Iniciando sesion...' : 'Login'}
                </Button>
                <Typography variant="body2" style={{ marginTop: '10px' }}>
                    No tenes cuenta? <Link to={"/register"} style={{ color: 'blue' }}>Registrate aqui</Link>
                </Typography>
            </Paper>
        </Container>
    );
};

export default Login;