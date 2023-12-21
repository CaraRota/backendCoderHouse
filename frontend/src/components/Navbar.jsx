import React from 'react'

//MUI
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

//RRD
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
    const storeName = 'Tienda Online';

    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <>
            <AppBar position="sticky" style={{ backgroundColor: '#2196F3' }}>
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6">
                        <Link to={"/"}>{storeName}</Link>
                    </Typography>
                    <Button color="inherit" onClick={handleLogin}>Login</Button>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar