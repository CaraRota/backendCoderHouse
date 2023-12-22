import React, { useState } from 'react';

//Cart Context
import { useCart } from '../../hooks/CartContext';

//MUI
import { Button, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ProductCount = ({ initialCount, onCountChange, onAddToCart, stock, productID }) => {

    const { cart, addProductToCart } = useCart();

    const [count, setCount] = useState(initialCount || 1);

    const increaseCount = () => {
        if (count < stock) {
            setCount((prevCount) => prevCount + 1);
            onCountChange && onCountChange(count + 1);
        }
    };

    const decreaseCount = () => {
        if (count > 1) {
            setCount((prevCount) => prevCount - 1);
            onCountChange && onCountChange(count - 1);
        }
    };

    const handleAddToCart = () => {
        addProductToCart(productID, count);
        onAddToCart && onAddToCart(count);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton color={"error"} onClick={decreaseCount} size="small">
                    <RemoveIcon />
                </IconButton>
                <Typography variant="body1">{count}</Typography>
                <IconButton color={'success'} onClick={increaseCount} size="small">
                    <AddIcon />
                </IconButton>
            </div>
            <Button variant="outlined" color="success" onClick={handleAddToCart} style={{ marginTop: '1.2rem', marginBottom: '1.2rem' }}>
                Agregar al carrito
            </Button>
        </div>
    );
};

export default ProductCount;