import { Router } from "express";
// import ProductManager from "../controllers/productManager.js"
import ProductModel from "../models/products.js"

const routerProd = Router();
// const productManager = new ProductManager("./src/models/products.json");

//READ ALL
routerProd.get('/', async (req, res) => {
    const { limit } = req.query;
    // const products = await productManager.getProducts();
    // const prod = products.slice(0, limit);
    try {
        const prod = await ProductModel.find().limit(parseInt(limit));
        res.status(200).send({ resultado: 'OK', message: prod });
    }
    catch (error) {
        res.status(400).send({ error: `Error al consultar productos: ${error}` });
    }
});

//READ BY ID
routerProd.get('/:pid', async (req, res) => {
    const { params } = req;
    // const product = await productManager.getProductById(parseInt(params.pid));
    // product ? res.status(200).send(product) : res.status(404).send("Producto no encontrado");
    try {
        const prod = await ProductModel.findById(params.pid);
        prod ? res.status(200).send({ resultado: 'OK', message: prod }) : res.status(404).send("Producto no encontrado");
    }
    catch (error) {
        res.status(400).send({ error: `Error al consultar producto: ${error}` });
    }
});

//CREATE
routerProd.post('/', async (req, res) => {
    const { title, description, price, thumbnail, code, stock, status, category } = req.body;
    // const confirmacion = await productManager.addProduct(title, description, price, thumbnail, code, stock, status, category);
    // confirmacion ? res.status(200).send("Producto creado correctamente") : res.status(400).send("Producto no creado. El producto ya existe o no has cargado todos los datos.")
    try {
        const respuesta = await ProductModel.create({
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category
        })
        res.status(200).send({ resultado: 'OK', message: respuesta });
    }
    catch (error) {
        res.status(400).send({ error: `Error al crear producto: ${error}` });
    }
});

//UPDATE
routerProd.put('/:pid', async (req, res) => {
    const { body, params } = req;
    // const confirmacion = await productManager.updateProduct(parseInt(params.pid), body);
    // confirmacion ? res.status(200).send("Producto modificado correctamente") : res.status(404).send("Producto no encontrado o no has cargado todos los datos");
    try {
        const prod = await ProductModel.findByIdAndUpdate(params.pid, body);
        prod ? res.status(200).send({ resultado: 'OK', message: prod }) : res.status(404).send("Producto no encontrado o no has cargado todos los datos");
    }
    catch (error) {
        res.status(400).send({ error: `Error al modificar producto: ${error}` });
    }
});

//DELETE
routerProd.delete('/:pid', async (req, res) => {
    const { params } = req;
    // const confirmacion = await productManager.deleteProduct(parseInt(params.pid));
    // confirmacion ? res.status(200).send("Producto eliminado correctamente") : res.status(404).send("Producto no encontrado");
    try {
        const prod = await ProductModel.findByIdAndDelete(params.pid);
        prod ? res.status(200).send({ resultado: 'OK', message: prod }) : res.status(404).send("Producto no encontrado");
    }
    catch (error) {
        res.status(400).send({ error: `Error al eliminar producto: ${error}` });
    }
});

export default routerProd;