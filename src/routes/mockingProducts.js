import { Router } from "express";
import generateRandomProducts from "../utils/mockingProducts.js";
import { passportError, authorization } from "../utils/messageErrors.js";

const routerMockingProducts = Router();

routerMockingProducts.get("/", passportError('jwt'), authorization(['admin']), (req, res) => {
    const products = generateRandomProducts(100);
    res.json(products);
});

export default routerMockingProducts;