import express from 'express';
import ProductManager from './productManager.js';

const app = express();
const PORT = 4000;
const productManager = new ProductManager();

app.use(express.urlencoded({ extended: true }));

// const createProductsFn = async () => {
//     await productManager.addProduct("Escuadra", "Escuadra de 30cm", 123.45, "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png", "ESC", 123);
//     await productManager.addProduct("Calculadora", "Calculadora cientifica", 234.56, "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png", "CAL", 234);
//     await productManager.addProduct("Globo Terraqueo", "Globo terraqueo", 345.67, "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png", "GLO", 345);
//     await productManager.addProduct("Regla", "Regla de 20cm", 456.78, "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png", "REG", 456);
// }
// createProductsFn();

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