import express from 'express';
import { app, io } from './config/config.js';

//IMPORT ROUTES
import routerProd from './routes/products.js';
import routerCart from './routes/carts.js';
import routerHome from './routes/homepage.js';
import routerMessages from './routes/messages.js';

// IMPORT MODELS
import productModel from './models/products.js';
import messagesModel from './models/messages.js';

// OTHERS
import { engine } from 'express-handlebars';
import { __dirname } from "./path.js"
import path from 'path';


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
        const products = await productModel.find();
        socket.emit('productos', products);
    });

    socket.on('nuevoProducto', async (product) => {
        console.log(product);
        const addProd = await productModel.create(product);
        if (addProd) {
            socket.emit('mensajeProductoCreado', "Producto creado correctamente");
            socket.emit('productos', await productModel.find());
        } else {
            socket.emit('mensajeProductoCreado', "Error al crear el producto");
        }
    });

    socket.on('eliminarProducto', async (id) => {
        const delProd = await productModel.findByIdAndDelete(id);
        if (delProd) {
            socket.emit('mensajeProductoEliminado', "Producto eliminado correctamente");
            socket.emit('productos', await productModel.find());
        } else {
            socket.emit('mensajeProductoEliminado', "Error al eliminar el producto");
        }
    });

    socket.on('mensaje', async data => {
        const { email, message } = data;
        await messagesModel.create({
            email,
            message
        });
        io.sockets.emit('mensajes', data);
    });

    socket.on('getMessages', async () => {
        const messages = await messagesModel.find();
        socket.emit('all-messages', messages);
    });
});

//Routes
app.use("/static", express.static(path.join(__dirname, "/public")));
app.use("/api/products", routerProd)
app.use("/api/carts", routerCart)
app.use("/api/messages", routerMessages)

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

app.get('/static/messages', (req, res) => {
    res.render('messages', {
        rutaCSS: "messages",
        rutaJS: "messages"
    });
});

app.use("/", routerHome) //Este debe ir ultimo porque maneja el Error 404