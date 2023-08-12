import { Router } from "express";
import ProductManager from "../controllers/productManager.js"

const routerProd = Router();
const productManager = new ProductManager("./src/models/products.json");

//READ ALL
routerProd.get('/', async (req, res) => {
    const { limit } = req.query;
    const products = await productManager.getProducts();
    const prod = products.slice(0, limit);
    res.status(200).send(prod);
});

//READ BY ID
routerProd.get('/:pid', async (req, res) => {
    const { params } = req;
    const product = await productManager.getProductById(parseInt(params.pid));
    product ? res.status(200).send(product) : res.status(404).send("Producto no encontrado");
});

//CREATE
routerProd.post('/', async (req, res) => {
    const { title, description, price, thumbnail, code, stock, status, category } = req.body;
    const confirmacion = await productManager.addProduct(title, description, price, thumbnail, code, stock, status, category);
    confirmacion ? res.status(200).send("Producto creado correctamente") : res.status(400).send("Producto no creado. El producto ya existe o no has cargado todos los datos.")
});

//UPDATE
routerProd.put('/:pid', async (req, res) => {
    const { body, params } = req;
    const confirmacion = await productManager.updateProduct(parseInt(params.pid), body);
    confirmacion ? res.status(200).send("Producto modificado correctamente") : res.status(404).send("Producto no encontrado o no has cargado todos los datos");
});

//DELETE
routerProd.delete('/:pid', async (req, res) => {
    const { params } = req;
    const confirmacion = await productManager.deleteProduct(parseInt(params.pid));
    confirmacion ? res.status(200).send("Producto eliminado correctamente") : res.status(404).send("Producto no encontrado");
});

export default routerProd;