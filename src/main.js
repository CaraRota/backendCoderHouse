import express from 'express';
import routerProd from './routes/products.js';
import routerCart from './routes/carts.js';
import routerHome from './routes/homepage.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import { __dirname } from "./path.js"
import path from 'path';
import ProductManager from './controllers/productManager.js';

const app = express();
const PORT = 8080;

const prodManager = new ProductManager('./src/models/products.json');

//CREATE SERVER
const server = app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`);
});

const io = new Server(server);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

//Conexion Socket
io.on('connection', socket => {
    console.log('Conexión con Socket.io');

    socket.on('getProducts', async () => {
        const products = await prodManager.getProducts();
        socket.emit('productos', products);
    });

    socket.on('nuevoProducto', async (product) => {
        console.log(product);
        const addProd = await prodManager.addProduct(product);
        if (addProd) {
            socket.emit('mensajeProductoCreado', "Producto creado correctamente");
            socket.emit('productos', await prodManager.getProducts());
        } else {
            socket.emit('mensajeProductoCreado', "Error al crear el producto");
        }
    });
});

//Routes
app.use("/static", express.static(path.join(__dirname, "/public")));
app.use("/api/products", routerProd)
app.use("/api/carts", routerCart)

//HBs
app.get('/static/home', (req, res) => {
    res.render('home', {
        rutaCSS: "home",
        rutaJS: "home"
    });
});

app.get('/static/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {
        rutaCSS: "realTimeProducts",
        rutaJS: "realTimeProducts"
    });
});

app.use("/", routerHome) //Este debe ir ultimo porque maneja el Error 404