import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Button, CssBaseline } from '@mui/material';
import Spinner from './Spinner';

import noImage from '../assets/noproductimage.png';

const Homepage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await fetch('http://localhost:3000/api/products');
                const data = await response.json();
                setProducts(data.message.docs);
            }
            fetchData();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <>
            {isLoading ?
                <Spinner />
                :
                <>
                    <CssBaseline />
                    <Container maxWidth="lg" style={{ padding: '24px' }}>
                        <Grid container spacing={3}>
                            {products?.map((product) => (
                                <Grid item key={product._id} xs={12} sm={6} md={4}>
                                    <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <CardMedia
                                            style={{ paddingTop: '56.25%' }} // 16:9
                                            image={product.thumbnail[0] === "none" ? noImage : product.thumbnail[0]}
                                            title={product.title}
                                        />
                                        <CardContent style={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {product.title}
                                            </Typography>
                                            <Typography>{product.description}</Typography>
                                        </CardContent>
                                        <Button variant="outlined" color="primary" spacing={2}>
                                            {product.price} USD
                                        </Button>
                                        <Button variant="contained" color="success" spacing={2}>
                                            Add to Cart
                                        </Button>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </>
            }
        </>
    );
};

export default Homepage;