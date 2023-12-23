import React, { useEffect } from 'react';
import { useCart } from '../hooks/CartContext';
import { Card, CardContent, Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
    const { cart, modifyProductQty, removeProductFromCart, checkoutCart, totalQty, totalAmount } = useCart();

    const handleQuantityChange = (productId, newQuantity) => {
        modifyProductQty(productId, newQuantity);
    };

    const handleRemoveProduct = (productId) => {
        removeProductFromCart(productId);
    };

    const handleCheckout = () => {
        checkoutCart();
    };

    return (
        <Card elevation={3} style={{ margin: '20px' }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Your Shopping Cart
                </Typography>
                {cart.length > 0 ? (
                    <>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Producto</TableCell>
                                        <TableCell>Categoria</TableCell>
                                        <TableCell align="right">Cantidad</TableCell>
                                        <TableCell align="right">Precio</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cart.map((product) => (
                                        <TableRow key={product.id_prod._id}>
                                            <TableCell>{product.id_prod.title}</TableCell>
                                            <TableCell>{product.id_prod.category}</TableCell>
                                            <TableCell align="right">{product.quantity}</TableCell>
                                            <TableCell align="right">{product.id_prod.price} USD</TableCell>
                                            <TableCell align="right">
                                                <IconButton color="secondary" onClick={() => handleRemoveProduct(product.id_prod._id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick={() => handleQuantityChange(product.id_prod._id, product.quantity + 1)}
                                                >
                                                    +
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    disabled={product.quantity === 1}
                                                    onClick={() => handleQuantityChange(product.id_prod._id, product.quantity - 1)}
                                                >
                                                    -
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Typography align='right' variant="h6" style={{ marginTop: '20px' }}>
                            Totals:
                        </Typography>
                        <Typography align='right' variant="body1">
                            Total Quantity: {totalQty}
                        </Typography>
                        <Typography align='right' variant="body1">
                            Total Amount: {totalAmount.toFixed(2)} USD
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={handleCheckout}
                            style={{ marginTop: '20px' }}
                        >
                            Checkout
                        </Button>
                    </>
                ) : (
                    <Typography variant="body1">Your cart is empty.</Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default Cart;
