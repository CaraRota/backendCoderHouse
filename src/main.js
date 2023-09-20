import express from 'express';
import { app, io } from './config/config.js';

//IMPORT ROUTES
import routerProd from './routes/products.js';
import routerCart from './routes/carts.js';
import routerHome from './routes/homepage.js';
import routerMessages from './routes/messages.js';
import routerSession from './routes/sessions.js';
import routerUser from './routes/users.js';

// IMPORT MODELS
import productModel from './models/products.js';
import messagesModel from './models/messages.js';
import userModel from './models/users.js';

// OTHERS
import { engine } from 'express-handlebars';
import { __dirname } from "./path.js"
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SIGNED_COOKIE));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_DB_URL,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 600 //10 minutos
    }),
}));

//Auth para admin
const authAdmin = (req, res, next) => {
    if (req.session.email == "admin@admin.com" && req.session.password == "1234") {
        return next() //Continua con la ejecucion normal de la ruta
    }
    return res.send("No tenes acceso a este contenido")
}

//Auth para usuarios logueados
const authUser = (req, res, next) => {
    if (req.session.login) {
        return next() //Continua con la ejecucion normal de la ruta
    }
    return res.send("No tenes acceso a este contenido")
}

//Conexion Socket
io.on('connection', socket => {
    console.log('Conexión con Socket.io');

    socket.on('getProducts', async () => {
        const products = await productModel.find();
        socket.emit('productos', products);
    });

    socket.on('nuevoProducto', async (product) => {
        console.log(product);
        try {
            const addProd = await productModel.create(product);
            if (addProd) {
                socket.emit('mensajeProductoCreado', "Producto creado correctamente");
                socket.emit('productos', await productModel.find());
            }
        }
        catch (error) {
            socket.emit('mensajeProductoCreado', "Error al crear el producto");
            socket.emit('productos', await productModel.find());
            console.error(error);
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
    socket.on('getUserEmail', () => {
        socket.emit('userEmail', "req.session.email");
    });
});

//Routes
app.use("/static", express.static(path.join(__dirname, "/public")));
app.use("/api/products", routerProd)
app.use("/api/carts", routerCart)
app.use("/api/messages", routerMessages)
app.use('/api/users', routerUser)
app.use('/api/sessions', routerSession)

//HBs
app.get('/static/home', authUser, (req, res) => {
    res.render('home', {
        rutaCSS: "home",
        rutaJS: "home",
    });
});

app.get('/static/realtimeproducts', authAdmin, (req, res) => {
    res.render('realTimeProducts', {
        rutaCSS: "realTimeProducts",
        rutaJS: "realTimeProducts"
    });
});

app.get('/static/messages', authUser, (req, res) => {
    res.render('messages', {
        rutaCSS: "messages",
        rutaJS: "messages"
    });
});

app.get('/static/login', (req, res) => {
    res.render('login', {
        rutaCSS: "login",
        rutaJS: "login",
    });
});

app.get('/static/register', (req, res) => {
    res.render('register', {
        rutaCSS: "register",
        rutaJS: "register"
    });
});

app.use("/", routerHome) //Este debe ir ultimo porque maneja el Error 404