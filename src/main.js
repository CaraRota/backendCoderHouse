import express from 'express';
import routerProd from './routes/products.js';
import routerHome from './routes/homepage.js';
import { __dirname } from "./path.js"
import path from 'path';

const app = express();
const PORT = 8080;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/static", express.static(path.join(__dirname, "/public")));
app.use("/products", routerProd)
app.use("/", routerHome) //Este debe ir ultimo porque maneja el Error 404

//CREATE SERVER
app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`);
});