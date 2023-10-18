import { Router } from "express";
import routerProd from "./products.js";
import routerCart from "./carts.js";
import routerHome from './homepage.js'
import routerMessages from './messages.js'
import routerSession from "./sessions.js";
import routerUser from "./users.js";
import routerHandlebars from './handlebars.js'

const router = Router()

router.use("/static", routerHandlebars)
router.use("/api/products", routerProd)
router.use("/api/carts", routerCart)
router.use("/api/messages", routerMessages)
router.use('/api/users', routerUser)
router.use('/api/sessions', routerSession)

router.use("/", routerHome) //Este debe ir ultimo porque maneja el Error 404

export default router