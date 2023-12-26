import React, { useState } from 'react';

//MUI
import { TextField, Button, Paper, Typography, Container, CssBaseline, Alert } from '@mui/material';

//User Context
import { useUser } from '../hooks/UserContext'

//RRD
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { login } = useUser();

    const handleLogin = async () => {
        setIsLoading(true);
        setError('');
        try {
            await login({ email, password });
            navigate('/');

        } catch (error) {
            setError(error.message);
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
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={handleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? 'Iniciando sesion...' : 'Login'}
                </Button>
                <Typography variant="body2" style={{ marginTop: '10px' }}>
                    No tenes cuenta? <Link to="/register" style={{ color: 'blue' }}>Registrate aqui</Link>
                </Typography>
            </Paper>
        </Container>
    );
};

export default Login;