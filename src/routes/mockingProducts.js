import { Router } from "express";
import { products } from "../utils/mockingProducts.js";
import { passportError, authorization } from "../utils/messageErrors.js";

const routerMockingProducts = Router();

routerMockingProducts.get("/", passportError('jwt'), authorization(['admin']), (req, res) => {
    res.json(products);
});

export default routerMockingProducts;