import { promises as fs } from 'fs';

export default class CartManager {
    constructor(cartsPath, productsPath) {
        this.carts = []
        this.cartsPath = cartsPath
        this.productsPath = productsPath
    }

    async createCart() {
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
    }

    async getCart(id) {
        const carts = JSON.parse(await fs.readFile(this.cartsPath, 'utf-8'))
        const cart = carts.find(cart => cart.id === parseInt(id))
        return cart
    }

    async addToCart(cartID, productID) {
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
    }
}
