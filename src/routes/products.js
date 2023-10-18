import { Router } from "express";
import { deleteProduct, getProductById, getProducts, postProduct } from "../controllers/products.js";
import { passportError, authorization } from "../utils/messageErrors.js";

const routerProd = Router();

routerProd.get('/', getProducts);
routerProd.get('/:pid', getProductById);
routerProd.post('/', passportError('jwt'), authorization(['admin']), postProduct);
routerProd.put('/:pid', passportError('jwt'), authorization(['admin']), postProduct);
routerProd.delete('/:pid', passportError('jwt'), authorization(['admin']), deleteProduct);

export default routerProd;