import { Router } from "express";
import { postCart, getCarts, getCartById, addProductToCart, emptyCart, removeProductFromCart, modifyProductQty, modifyCart, checkoutCart } from '../controllers/carts.js'
import { passportError, authorization } from "../utils/messageErrors.js";

const routerCart = Router();

routerCart.get('/', passportError('jwt'), getCarts);
routerCart.post('/', passportError('jwt'), authorization(['user']),postCart);
routerCart.get('/:cid', passportError('jwt'), authorization(['user']), getCartById);
routerCart.put('/:cid', passportError('jwt'), authorization(['user']), modifyCart);
routerCart.delete('/:cid', passportError('jwt'), authorization(['user']), emptyCart);
routerCart.post('/:cid/products/:pid', passportError('jwt'), authorization(['user']), addProductToCart);
routerCart.put('/:cid/products/:pid', passportError('jwt'), authorization(['user']), modifyProductQty);
routerCart.delete('/:cid/products/:pid', passportError('jwt'), authorization(['user']), removeProductFromCart);
routerCart.post('/:cid/checkout', passportError('jwt'), authorization(['user']), checkoutCart);

export default routerCart;