import React, { useEffect, useState } from 'react'

//MUI
import { AppBar, Toolbar, Typography, Button, Snackbar, Alert, Stack, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

//RRD
import { useNavigate, Link } from 'react-router-dom';

//User Context
import { useUser } from '../hooks/UserContext';

//Cart Context
import { useCart } from '../hooks/CartContext';

const Navbar = () => {
    const { user, logout, loggedIn } = useUser();
    const { totalQty } = useCart();

    const storeName = 'Tienda Online';
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            handleClose();
            navigate('/');
            setOpen(true);
            setMessage('Has cerrado sesión correctamente');
        } catch (error) {
            console.error('Error during logout:', error);
            setError("Error al cerrar sesión. Recargando...");
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogin = () => {
        navigate('/login');
    };

    useEffect(() => {
        if (loggedIn) {
            setOpen(true);
            setMessage('Has iniciado sesión correctamente');
        }
    }, [loggedIn]);

    return (
        <>
            {
                error && <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" variant="outlined" sx={{ width: '100%' }}>
                        {error}
                    </Alert >
                </Snackbar >
            }
            {
                open && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" variant="outlined" sx={{ width: '100%' }}>
                        {message}
                    </Alert >
                </Snackbar >
            }
            <AppBar position="sticky" style={{ backgroundColor: '#2196F3' }}>
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6">
                        <Link to={"/"}>{storeName}</Link>
                    </Typography>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {user ? (
                            <>
                                <Link to={"/cart"}>
                                    <Stack spacing={2} direction="row" alignItems="center">
                                        <Badge badgeContent={totalQty} color="success">
                                            <ShoppingCartIcon color="action" />
                                        </Badge>
                                    </Stack>
                                </Link>
                                <PowerSettingsNewIcon color="inherit" onClick={handleLogout} style={{ cursor: 'pointer', marginLeft: '1.2rem' }} />
                            </>
                        ) : (
                            <Button color="inherit" onClick={handleLogin}>
                                Login
                            </Button>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar