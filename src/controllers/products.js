import ProductModel from "../models/products.js";

//Error handling
import CustomError from '../services/errors/customError.js';
import EErrors from '../services/errors/enums.js';
import { generateProductErrorInfo } from "../services/errors/info.js";

//READ ALL PRODUCTS
export const getProducts = async (req, res) => {
    const { limit, page, sort, category, status } = req.query;

    const parsedLimit = parseInt(limit) || 10
    const parsedPage = parseInt(page) || 1
    const getSorted = sort === 'asc' || sort === 'desc' ? sort : null

    const query = {}
    if (category) query.category = category
    if (status) query.status = status

    try {
        const prod = await ProductModel.paginate(query, { limit: parsedLimit, page: parsedPage, sort: { price: getSorted } });
        res.status(200).send({ resultado: 'OK', message: prod });
    }
    catch (error) {
        res.status(400).send({ error: `Error al consultar productos: ${error}` });
    }
}

//GET PRODUCTS BY ID
export const getProductById = async (req, res) => {
    const { pid } = req.params;
    try {
        const prod = await ProductModel.findById(pid);
        prod ? res.status(200).send({ resultado: 'OK', message: prod }) : res.status(404).send("Producto no encontrado");
    }
    catch (error) {
        res.status(400).send({ error: `Error al consultar producto: ${error}` });
    }
};

//POST A NEW PRODUCT
export const postProduct = async (req, res) => {
    const { title, description, price, stock, code, category, status } = req.body;

    try {
        if (!title || !description || !price || !stock || !code || !category) {
            CustomError.createError({
                name: "Product creation error",
                cause: generateProductErrorInfo({ title, description, price, stock, code, category }),
                message: "One or more properties were incomplete or not valid.",
                code: EErrors.INVALID_PRODUCT_ERROR
            })
            return;
        }

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
};

//UPDATE A PRODUCT
export const putProduct = async (req, res) => {
    const { body, params } = req;
    try {
        const prod = await ProductModel.findByIdAndUpdate(params.pid, body);
        prod ? res.status(200).send({ resultado: 'OK', message: prod }) : res.status(404).send("Producto no encontrado o no has cargado todos los datos");
    }
    catch (error) {
        res.status(400).send({ error: `Error al modificar producto: ${error}` });
    }
}

//DELETE A PRODUCT
export const deleteProduct = async (req, res) => {
    const { pid } = req.params;
    try {
        const prod = await ProductModel.findByIdAndDelete(pid);
        prod ? res.status(200).send({ resultado: 'OK', message: prod }) : res.status(404).send("Producto no encontrado");
    }
    catch (error) {
        res.status(400).send({ error: `Error al eliminar producto: ${error}` });
    }
}