import { Router } from "express";
import cartsModel from "../models/carts.js";

const routerCart = Router();

// START MONGO DB IMPLEMENTATION

//CREATE NEW CART
routerCart.post('/', async (req, res) => {
    try {
        const newCart = cartsModel.create({});
        res.status(200).send({ resultado: 'OK', message: newCart });
    }
    catch (error) {
        res.status(400).send({ error: `Error al crear producto: ${error}` });
    }
});

//GET ALL CARTS
routerCart.get('/', async (req, res) => {
    try {
        const carts = await cartsModel.find({});
        res.status(200).send({ resultado: 'OK', message: carts });
    }
    catch (error) {
        res.status(400).send({ error: `Error al obtener carritos: ${error}` });
    }
});

//GET CART BY ID
routerCart.get('/:cid', async (req, res) => {
    try {
        const { params } = req;
        const cart = await cartsModel.findById(params.cid);
        res.status(200).send({ resultado: 'OK', message: cart });
    }
    catch (error) {
        res.status(400).send({ error: `Error al obtener carrito: ${error}` });
    }
});

//ADD PRODUCT TO CART
routerCart.post('/:cid/products/:pid', async (req, res) => {
    try {
        const { quantity } = req.body;
        const { cid, pid } = req.params;
        const cart = await cartsModel.findById(cid);
        cart.products.push({ id_prod: pid, quantity: quantity });
        await cart.save();
        res.status(200).send({ resultado: 'OK', message: cart });
    }
    catch (error) {
        res.status(400).send({ error: `Error al agregar producto al carrito: ${error}` });
    }
});

//REMOVE CART BY ID
routerCart.delete('/:cid', async (req, res) => {
    try {
        const { params } = req;
        const cart = await cartsModel.findByIdAndDelete(params.cid);
        res.status(200).send({ resultado: 'OK', message: cart });
    }
    catch (error) {
        res.status(400).send({ error: `Error al eliminar carrito: ${error}` });
    }
});

export default routerCart;