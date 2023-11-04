import { Router } from "express";
import { products } from "../utils/mockingProducts.js";

const routerMockingProducts = Router();

routerMockingProducts.get("/", (req, res) => {
    res.json(products);
});

export default routerMockingProducts;