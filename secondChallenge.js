import { promises as fs } from "fs"
class ProductManager {
    constructor() {
        this.path = "./products.txt"
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

    async addProduct(title, description, price, thumbnail, code, stock) {
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))

        if (products.find(product => product.code == code)) {
            console.log('Ya existe un producto cargado con el codigo', code)
        } else if (!title || !description || !price || !thumbnail || !stock) {
            console.log("Asegurate de haber cargado todos los datos")
        } else {
            products.push({
                id: this.IDgenerator(),
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock
            })
            await fs.writeFile(this.path, JSON.stringify(products))
            console.log("Producto cargado correctamente con el id:", this.lastID)
        }
    }

    async getProducts() {
        const products = JSON.parse(await fs.readFile(this.path, "utf-8"))
        products.length === 0 ? console.log('No hay productos cargados:', products) : console.log("Productos cargados:", products)
    }

    async getProductById(id) {
        const products = JSON.parse(await fs.readFile(this.path, "utf-8"))

        const product = products.find(prod => prod.id === id)
        product ? console.log(product) : console.log('Producto no encontrado')
    }

    async updateProduct(id, { title, description, price, thumbnail, code, stock }) {
        const products = JSON.parse(await fs.readFile(this.path, "utf-8"))

        const index = products.findIndex(prod => prod.id === id)
        if (index === -1) {
            console.log("No existe un producto con la ID solicitada.")
        } else if (!title || !description || !price || !thumbnail || !stock) {
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
                stock: stock
            }
            await fs.writeFile(this.path, JSON.stringify(products))
            console.log("Producto actualizado correctamente con el id:", id)
        }
    }
    async deleteProduct(id) {
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))

        if (products.find(prod => prod.id == id)) {
            //Get all the products except the one with the id
            const newProducts = products.filter(product => product.id != id)
            await fs.writeFile(this.path, JSON.stringify(newProducts))
            console.log("Producto eliminado correctamente con el id:", id)
        }
        else {
            console.log("No existe un producto con la ID solicitada.")
        }
    }
}

//////////////////////////////////////////////////
//////////////////////////////////////////////////
////////////// TESTING STARTS HERE ///////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

const testingFn = async () => {

    const manager = new ProductManager()
    await manager.getProducts() // Devuelve array vacio

    //Agrego un producto con todos los datos cargados correctamente
    //Consola arroja: Producto cargado correctamente con el id: 1
    await manager.addProduct('Coca Cola', 'Gaseosa', 100, 'https:cocacola/coca.jpg', 25, 10)

    await manager.getProducts() // //Llamo a getProducts para ver el producto recien agregado

    // //Agrego mas productos de manera correcta
    await manager.addProduct('Sprite', 'Gaseosa', 100, 'https:cocacola/sprite.jpg', "code2", 10)
    await manager.addProduct('PDT', 'Gaseosa', 125, 'https:cocacola/pdt.jpg', "code18", 5)

    // //Agrego un producto con todos los datos cargados correctamente pero que repite codigo con el producto cargado anteriormente
    // //Consola arroja: Ya existe un producto cargado con el codigo 25
    await manager.addProduct('Pepsi', 'Gaseosa', 100, 'https:cocacola/pepsi.jpg', 25, 10)

    // //Agrego un producto con un dato menos (en este caso, la descripcion)
    // //Consola arroja: Asegurate de haber cargado todos los datos
    await manager.addProduct('Fanta', 100, 'https:cocacola/fanta.jpg', 5, 10)

    // //Llamo al metodo getProductById con el id de un producto que existe
    // //Consola arroja el resultado con el producto que coincide con el id
    await manager.getProductById(2)
    await manager.getProductById(55) //Consola arroja: Producto no encontrado


    // await manager.deleteProduct(2)
    // await manager.getProducts()
    // await manager.deleteProduct(3)
    //Elimino el producto con id 1
    await manager.deleteProduct(2)

    //Actualizo un producto que no existe
    await manager.updateProduct(2, { title: 'Coca Cola', description: 'Gaseosa', price: 120000, thumbnail: 'https:cocacola/coca.jpg', code: 25, stock: 10 })

    //Actualizo el producto que si existe (cambio el precio a 120000)
    await manager.updateProduct(1, { title: 'Coca Cola', description: 'Gaseosa', price: 120000, thumbnail: 'https:cocacola/coca.jpg', code: 25, stock: 10 })

    //Vuelvo a llamar a los productos
    await manager.getProducts()
    await manager.addProduct("7up", "Gaseosa", 100, "https:cocacola/7up.jpg", "code7", 10)
}

testingFn()