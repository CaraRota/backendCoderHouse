import cartsModel from '../models/carts.js'
import productsModel from '../models/products.js'
import userModel from '../models/users.js';

//CREATE NEW CART
export const postCart = async (req, res) => {
    try {
        const newCart = cartsModel.create({});
        res.status(200).send({ resultado: 'OK', message: newCart });
    }
    catch (error) {
        res.status(400).send({ error: `Error al crear producto: ${error}` });
    }
}

//GET ALL CARTS
export const getCarts = async (req, res) => {
    const { limit } = req.query;

    try {
        const carts = await cartsModel.find({}).limit(parseInt(limit));
        carts ? res.status(200).send({ resultado: 'OK', message: carts })
            : res.status(404).send({ error: `Carritos no encontrados: ${error}` });
    }
    catch (error) {
        res.status(400).send({ error: `Error al obtener carritos: ${error}` });
    }
}

//GET CART BY ID
export const getCartById = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartsModel.findById(cid);
        cart ? res.status(200).send({ resultado: 'OK', message: cart })
            : res.status(404).send({ error: `Carrito no encontrado: ${error}` });
    }
    catch (error) {
        res.status(400).send({ error: `Error al obtener carrito: ${error}` });
    }
}

//ADD PRODUCT TO CART
export const addProductToCart = async (req, res) => {
    try {
        const { quantity } = req.body;
        const { cid, pid } = req.params;

        const cart = await cartsModel.findById(cid);
        const product = await productsModel.findById(pid);
        const findIndex = cart.products.findIndex(product => product.id_prod._id.equals(pid));

        //Check if product exists in cart
        if (findIndex !== -1) {
            //Check if stock is enough
            if (product.stock < cart.products[findIndex].quantity + quantity) {
                res.status(400).send({ error: `Error al agregar producto al carrito: No hay stock suficiente, solo tenemos ${product.stock} unidad(es) disponible(s)` });
                return;
            }
            cart.products[findIndex].quantity += quantity;
        } else {
            if (product.stock < quantity) {
                res.status(400).send({ error: `Error al agregar producto al carrito: No hay stock suficiente, solo tenemos ${product.stock} unidad(es) disponible(s)` });
                return;
            }
            cart.products.push({ id_prod: pid, quantity: quantity });
        }

        await cart.save();
        res.status(200).send({ resultado: 'OK', message: cart });
    }
    catch (error) {
        res.status(400).send({ error: `Error al agregar producto al carrito: ${error}` });
    }
}

//REMOVE CART BY ID (EMPTY CART)
export const emptyCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartsModel.findByIdAndUpdate(cid, { products: [] });

        cart ? res.status(200).send({ resultado: 'OK', message: cart })
            : res.status(404).send({ error: `Carrito no encontrado: ${error}` });
    }
    catch (error) {
        res.status(400).send({ error: `Error al eliminar carrito: ${error}` });
    }
}

//REMOVE PRODUCT FROM CART
export const removeProductFromCart = async (req, res) => {
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
}

//MODIFY QTY OF PRODUCT IN CART
export const modifyProductQty = async (req, res) => {
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
}

// MODIFY CART WITH PRODUCTS
export const modifyCart = async (req, res) => {
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
}

//CHECKOUT CART
export const checkoutCart = async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartsModel.findById(cid);

        if (cart) {
            const email = req.user.email;
            let amount = 0;
            const purchaseItems = [];

            //Calculate amount and purchase items
            for (let products in cart.products) {

                const product = await productsModel.findById(cart.products[products].id_prod);

                //Check stock
                if (product.stock >= cart.products[products].quantity) {

                    const price = product.price;
                    const quantity = cart.products[products].quantity;

                    //Calculate amount depending on user role
                    if (userModel.role === 'premium') {
                        amount += price * quantity * 0.8;
                    } else {
                        amount += price * quantity;
                    }

                    //Update stock from database
                    await productsModel.findByIdAndUpdate(cart.products[products].id_prod, { stock: product.stock - quantity });
                    purchaseItems.push({ title: product.title });
                }
            }

            //Empty cart
            await cartsModel.findByIdAndUpdate(cid, { products: [] });

            //Generate ticket
            res.redirect(
                `/api/tickets/create?amount=${amount}&email=${email}`
            );
        } else {
            res.status(404).send({ resultado: 'Not Found', message: cart });
        }
    } catch (error) {
        res.status(400).send({ error: `Error al consultar carrito: ${error}` });
    }
};