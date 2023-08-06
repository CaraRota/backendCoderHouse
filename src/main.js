import express from 'express';
import ProductManager from './productManager.js';

const app = express();
const PORT = 8080;
const productManager = new ProductManager();

app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    res.send('Home Page');
});

app.get('/products', async (req, res) => {
    const { limit } = req.query;
    const products = await productManager.getProducts();
    limit ? res.send(products.slice(0, limit)) : res.send(products);
});

app.get('/products/:id', async (req, res) => {
    const product = await productManager.getProductById(parseInt(req.params.id));
    product ? res.send(product) : res.status(404).send("Producto no encontrado");
});

app.get("*", (req, res) => {
    res.status(404).send("Error 404");
});

app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`);
});