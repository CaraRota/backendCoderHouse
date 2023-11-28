import { Router } from "express";
import { deleteProduct, getProductById, getProducts, postProduct, putProduct } from "../controllers/products.js";
import { passportError, authorization } from "../utils/messageErrors.js";

//Error handling
import CustomError from '../services/errors/customError.js';
import EErrors from '../services/errors/enums.js';
import { generateProductErrorInfo } from "../services/errors/info.js";

const routerProd = Router();

routerProd.get('/', getProducts);
routerProd.post('/', (req, res, next) => {
    const { title, description, price, stock, code, category } = req.body;
    try {
        if (!title || !description || !price || !stock || !code || !category) {
            CustomError.createError({
                name: "Product creation error",
                cause: generateProductErrorInfo({ title, description, price, stock, code, category }),
                message: "One or more properties were incomplete or not valid.",
                code: EErrors.INVALID_PRODUCT_ERROR
            })
        }
        next();
    } catch (error) {
        next(error);
    }
}, passportError('jwt'), authorization(['admin']), postProduct);
routerProd.get('/:pid', getProductById);
routerProd.put('/:pid', passportError('jwt'), authorization(['admin']), putProduct);
routerProd.delete('/:pid', passportError('jwt'), authorization(['admin']), deleteProduct);

export default routerProd;