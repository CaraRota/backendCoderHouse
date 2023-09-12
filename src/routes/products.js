import { Router } from "express";
import ProductModel from "../models/products.js"

const routerProd = Router();

//READ ALL
routerProd.get('/', async (req, res) => {
    const { limit, page, sort, category } = req.query;

    const parsedLimit = parseInt(limit) || 10
    const parsedPage = parseInt(page) || 1
    const getSorted = sort === 'asc' || sort === 'desc' ? sort : null

    const queryCategory = category ? { category } : {};

    try {
        const prod = await ProductModel.paginate(queryCategory, { limit: parsedLimit, page: parsedPage, sort: { price: getSorted } });
        res.status(200).send({ resultado: 'OK', message: prod });
    }
    catch (error) {
        res.status(400).send({ error: `Error al consultar productos: ${error}` });
    }
});

//READ BY ID
routerProd.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const prod = await ProductModel.findById(pid);
        prod ? res.status(200).send({ resultado: 'OK', message: prod }) : res.status(404).send("Producto no encontrado");
    }
    catch (error) {
        res.status(400).send({ error: `Error al consultar producto: ${error}` });
    }
});

//CREATE
routerProd.post('/', async (req, res) => {
    const { title, description, price, thumbnail, code, stock, status, category } = req.body;
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
    const { pid } = req.params;
    try {
        const prod = await ProductModel.findByIdAndDelete(pid);
        prod ? res.status(200).send({ resultado: 'OK', message: prod }) : res.status(404).send("Producto no encontrado");
    }
    catch (error) {
        res.status(400).send({ error: `Error al eliminar producto: ${error}` });
    }
});

export default routerProd;