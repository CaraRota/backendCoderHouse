import { promises as fs } from 'fs';

export default class CartManager {
    constructor(cartsPath, productsPath) {
        this.carts = []
        this.cartsPath = cartsPath
        this.productsPath = productsPath
    }

    async createCart() {
        try {
            const carts = JSON.parse(await fs.readFile(this.cartsPath, 'utf-8'))
            let newID = 1;

            if (carts.length > 0) {
                newID = carts[carts.length - 1].id + 1
            }

            carts.push({
                id: newID,
                products: []
            })
            await fs.writeFile(this.cartsPath, JSON.stringify(carts))
            return true
        } catch (error) {
            console.log(error)
        }
    }

    async getCart(id) {
        try {
            const carts = JSON.parse(await fs.readFile(this.cartsPath, 'utf-8'))
            const cart = carts.find(cart => cart.id === parseInt(id))
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async getCarts() {
        try {
            const carts = JSON.parse(await fs.readFile(this.cartsPath, 'utf-8'))
            return carts
        } catch (error) {
            console.log(error)
        }
    }
    async addToCart(cartID, productID) {
        try {
            const carts = JSON.parse(await fs.readFile(this.cartsPath, 'utf-8'));
            const products = JSON.parse(await fs.readFile(this.productsPath, 'utf-8'));

            const cart = carts.find(cart => cart.id === parseInt(cartID));
            const producto = products.find(product => product.id === parseInt(productID));

            if (cart && producto) {
                const existingProduct = cart.products.find(prod => prod.product === producto.id);

                if (existingProduct) {
                    existingProduct.quantity++;
                } else {
                    cart.products.push({
                        product: producto.id,
                        quantity: 1
                    });
                }
                await fs.writeFile(this.cartsPath, JSON.stringify(carts));
                return true;
            }
        } catch (error) {
            console.log(error);
        }
    }
    async deleteCart(cartID) {
        try {
            const carts = JSON.parse(await fs.readFile(this.cartsPath, 'utf-8'));
            const cart = carts.find(cart => cart.id === parseInt(cartID));

            if (cart) {
                const newCart = carts.filter(cart => cart.id !== parseInt(cartID));
                await fs.writeFile(this.cartsPath, JSON.stringify(newCart))
                console.log("Carrito eliminado correctamente")
                return true
            } else {
                console.log("El carrito que intentas eliminar no existe")
            }
        } catch (error) {
            console.log(error);
        }
    }
}
