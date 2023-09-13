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
    const { limit } = req.query;

    try {
        const carts = await cartsModel.find({}).limit(parseInt(limit));
        carts ? res.status(200).send({ resultado: 'OK', message: carts })
            : res.status(404).send({ error: `Carritos no encontrados: ${error}` });
    }
    catch (error) {
        res.status(400).send({ error: `Error al obtener carritos: ${error}` });
    }
});

//GET CART BY ID
routerCart.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartsModel.findById(cid);
        cart ? res.status(200).send({ resultado: 'OK', message: cart })
            : res.status(404).send({ error: `Carrito no encontrado: ${error}` });
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
        const findIndex = cart.products.findIndex(product => product.id_prod._id.equals(pid));

        if (findIndex !== -1) {
            cart.products[findIndex].quantity += quantity;
        } else {
            cart.products.push({ id_prod: pid, quantity: quantity });
        }

        await cart.save();
        res.status(200).send({ resultado: 'OK', message: cart });
    }
    catch (error) {
        res.status(400).send({ error: `Error al agregar producto al carrito: ${error}` });
    }
});

//REMOVE CART BY ID (EMPTY CART)
routerCart.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartsModel.findByIdAndUpdate(cid, { products: [] });

        cart ? res.status(200).send({ resultado: 'OK', message: cart })
            : res.status(404).send({ error: `Carrito no encontrado: ${error}` });
    }
    catch (error) {
        res.status(400).send({ error: `Error al eliminar carrito: ${error}` });
    }
});

//REMOVE PRODUCT FROM CART
routerCart.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartsModel.findById(cid);
        const findIndex = cart.products.findIndex(product => product.id_prod._id.equals(pid));

        if (findIndex !== -1) {
            cart.products.splice(findIndex, 1);
        }

        await cart.save();

        cart ? res.status(200).send({ resultado: 'OK', message: cart })
            : res.status(404).send({ error: `Carrito no encontrado: ${error}` });
    }
    catch (error) {
        res.status(400).send({ error: `Error al eliminar producto del carrito: ${error}` });
    }
});

//MODIFY QTY OF PRODUCT IN CART
routerCart.put('/:cid/products/:pid', async (req, res) => {
    try {
        const { quantity } = req.body;
        const { cid, pid } = req.params;

        const cart = await cartsModel.findById(cid);
        const findIndex = cart.products.findIndex(product => product.id_prod._id.equals(pid));

        if (findIndex !== -1) {
            cart.products[findIndex].quantity = quantity;
        } else {
            cart.products.push({ id_prod: pid, quantity: quantity });
        }

        await cart.save();
        cart ? res.status(200).send({ resultado: 'OK', message: cart })
            : res.status(404).send({ error: `Carrito no encontrado: ${error}` });
    }
    catch (error) {
        res.status(400).send({ error: `Error al agregar producto al carrito: ${error}` });
    }
});

// MODIFY CART WITH PRODUCTS
routerCart.put('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const updateProducts = req.body; // Saque la desestructuracion para poder enviar el body como un array de objetos

        /***************************************************************
        ** EJEMPLO DEL BODY ENVIADO POR POSTMAN PARA MODIFICAR CARRITO *
                [
                    {
                        "id_prod": "65007824b171ff4c2c39dc7d",
                        "quantity": 1
                    }
                ]
        ****************************************************************
        ***************************************************************/

        const cart = await cartsModel.findById(cid);

        updateProducts.forEach(product => {
            const productExist = cart.products.find(prod => prod.id_prod._id.equals(product.id_prod));
            if (productExist) {
                productExist.quantity += product.quantity; //Elijo sumar la cantidad del producto en vez de reemplazarla
            } else {
                cart.products.push(product);
            }
        });
        await cart.save();

        cart ?
            res.status(200).send({ resultado: 'OK', message: cart })
            : res.status(404).send({ error: `Carrito no encontrado: ${error}` });
    }
    catch (error) {
        res.status(400).send({ error: `Error al modificar carrito: ${error}` });
    }
});

export default routerCart;