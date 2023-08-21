import { promises as fs } from "fs"
export default class ProductManager {
    constructor(path) {
        this.products = []
        this.path = path
    }

    async addProduct({ title, description, price, thumbnail, code, stock, status, category }) {
        try {
            const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))

            if (typeof status !== "boolean") {
                status = true
            } else {
                status = status
            }

            if (products.find(product => product.code == code)) {
                console.log('Ya existe un producto cargado con el codigo', code)
            } else if (!title || !description || !price || !stock || !category) {
                console.log("Asegurate de haber cargado todos los datos")
            } else {
                let newID = 1;

                if (products.length > 0) {
                    newID = products[products.length - 1].id + 1
                }
                products.push({
                    id: newID,
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: [thumbnail],
                    code: code,
                    stock: stock,
                    status: status,
                    category: category
                })
                await fs.writeFile(this.path, JSON.stringify(products))
                console.log("Producto cargado correctamente con el id:", this.lastID)
                return true
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getProducts() {
        try {
            const products = JSON.parse(await fs.readFile(this.path, "utf-8"))
            return products
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(id) {
        try {
            const products = JSON.parse(await fs.readFile(this.path, "utf-8"))
            const product = products.find(prod => prod.id === id)
            return product
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(id, { title, description, price, thumbnail, code, stock, status, category }) {
        try {
            const products = JSON.parse(await fs.readFile(this.path, "utf-8"))

            const index = products.findIndex(prod => prod.id === id)
            if (index === -1) {
                console.log("No existe un producto con la ID solicitada.")
            } else if (!title || !description || !price || !thumbnail || !stock || !status || !category) {
                console.log("Asegurate de haber cargado todos los datos")
            }
            else {
                //Update the product here            
                products[index] = {
                    id: id,
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock,
                    status: status,
                    category: category
                }
                await fs.writeFile(this.path, JSON.stringify(products))
                console.log("Producto actualizado correctamente con el id:", id)
                return true
            }
        } catch (error) {
            console.log(error)
        }
    }
    async deleteProduct(id) {
        try {
            const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))

            if (products.find(prod => prod.id == id)) {
                //Get all the products except the one with the id
                const newProducts = products.filter(product => product.id != id)
                await fs.writeFile(this.path, JSON.stringify(newProducts))
                console.log("Producto eliminado correctamente con el id:", id)
                return true
            }
            else {
                console.log("No existe un producto con la ID solicitada.")
            }
        } catch (error) {
            console.log(error)
        }
    }
}