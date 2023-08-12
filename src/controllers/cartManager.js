import { promises as fs } from 'fs';

export default class CartManager {
    constructor(cartsPath, productsPath) {
        this.carts = []
        this.cartsPath = cartsPath
        this.productsPath = productsPath
        this.IDgenerator = this.incrementalID()
        this.lastID = 0
    }

    incrementalID = () => {
        let id = 0
        return () => {
            id++
            this.lastID = id
            return id
        }
    }

    async createCart() {
        const carts = JSON.parse(await fs.readFile(this.cartsPath, 'utf-8'))

        carts.push({
            id: this.IDgenerator(),
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
        const carts = JSON.parse(await fs.readFile(this.cartsPath, 'utf-8'))
        const products = JSON.parse(await fs.readFile(this.productsPath, 'utf-8'))

        const cart = carts.find(cart => cart.id === parseInt(cartID))
        const product = products.find(product => product.id === parseInt(productID))

        if (cart && product) {
            const existingProduct = cart.products.find(prod => prod.id === product.id);

            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.products.push({
                    id: product.id,
                    quantity: 1
                });
            }
            await fs.writeFile(this.cartsPath, JSON.stringify(carts));
            return true;
        }
    }
}
