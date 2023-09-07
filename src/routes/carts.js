import { Router } from "express";
import cartsModel from "../models/carts.js";

// import CartManager from "../controllers/cartManager.js";

const routerCart = Router();
// const cartManager = new CartManager("./src/models/carts.json", "./src/models/products.json");

// //CREATE NEW CART
// routerCart.post('/', async (req, res) => {
//     await cartManager.createCart();
//     res.status(200).send('Carrito creado correctamente');
// });

// //GET ALL CARTS
// routerCart.get('/', async (req, res) => {
//     const carts = await cartManager.getCarts();
//     carts ? res.status(200).send(carts) : res.status(404).send("No hay carritos cargados");
// });

// //GET CART BY ID
// routerCart.get('/:cid', async (req, res) => {
//     const { params } = req;
//     const cart = await cartManager.getCart(parseInt(params.cid));
//     cart ? res.status(200).send(cart) : res.status(404).send("Carrito no encontrado");
// });

// //ADD PRODUCT TO CART
// routerCart.post('/:cid/product/:pid', async (req, res) => {
//     const { params } = req;
//     const confirmacion = await cartManager.addToCart(parseInt(params.cid), parseInt(params.pid));
//     confirmacion ? res.status(200).send("Producto agregado correctamente al carrito") : res.status(404).send("Producto no encontrado o no has cargado todos los datos");
// });

// //REMOVE CART BY ID
// routerCart.delete('/:cid', async (req, res) => {
//     const { params } = req;
//     const confirmacion = await cartManager.deleteCart(parseInt(params.cid));
//     confirmacion ? res.status(200).send("Carrito eliminado correctamente") : res.status(404).send("Carrito no encontrado")
// })

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
routerCart.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { params } = req;
        const cart = await cartsModel.findById(params.cid);
        cart.products.push({ id_prod: params.pid, quantity: 1 });
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