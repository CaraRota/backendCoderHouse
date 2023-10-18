import { Router } from "express";
import { getHomepage, handleErrors } from "../controllers/homepage.js";

const routerHome = Router();

routerHome.get('/', getHomepage);
routerHome.get("*", handleErrors);

export default routerHome;