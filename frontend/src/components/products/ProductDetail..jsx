import React from "react";

//Assets
import noImage from "../../assets/noproductimage.png";

//MUI
import { Typography, Card, CardContent, CardMedia, Button } from "@mui/material";
import ProductCount from "./ProductCount";

//RRD
import { Link } from "react-router-dom";

//User Context
import { useUser } from "../../hooks/UserContext";

const ProductDetail = ({ product }) => {
    const { loggedIn } = useUser();

    return (
        <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <CardMedia
                style={{ paddingTop: "56.25%" }} // 16:9
                image={product.thumbnail[0] === "none" ? noImage : product.thumbnail[0]}
                title={product.title}
            />
            <CardContent style={{ flexGrow: 1 }}>
                <Typography gutterBottom variant='h5' component='div'>
                    {product.title}
                </Typography>
                <Typography paragraph>{product.description}</Typography>
                <Typography variant='h6' color='primary' gutterBottom>
                    {product.price} USD
                </Typography>
            </CardContent>
            {loggedIn ? (
                <ProductCount initialCount={0} stock={product.stock} productID={product._id} />
            ) : (
                <Link to={"/login"}>
                    <Button
                        variant='outlined'
                        color='primary'
                        sx={{
                            width: "95%",
                            alignContent: "center",
                            display: "block",
                            margin: "auto",
                            marginBottom: "1.2rem",
                        }}>
                        Inicia sesión para comprar
                    </Button>
                </Link>
            )}
        </Card>
    );
};

export default ProductDetail;
