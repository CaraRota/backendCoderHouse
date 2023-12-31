import { Router } from "express";
import routerProd from "./products.js";
import routerCart from "./carts.js";
import routerHome from './homepage.js'
import routerMessages from './messages.js'
import routerSession from "./session.js";
import routerUser from "./users.js";
import routerTicket from "./ticket.js";
import routerHandlebars from './handlebars.js'
import routerMockingProducts from './mockingProducts.js'
import routerLoggerTest from './loggersTest.js'
import swaggerUiExpress from 'swagger-ui-express';
import { specs } from "../config/config.js";

const router = Router()

router.use("/static", routerHandlebars)
router.use("/api/products", routerProd)
router.use("/api/carts", routerCart)
router.use("/api/messages", routerMessages)
router.use('/api/users', routerUser)
router.use('/api/session', routerSession)
router.use('/api/tickets', routerTicket)
router.use('/api/mockingproducts', routerMockingProducts)
router.use("/api/loggerTest", routerLoggerTest)
router.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

router.use("/", routerHome) //Este debe ir ultimo porque maneja el Error 404

export default router