class ProductManager {
    constructor() {
        this.products = []
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (this.products.find(product => product.code === code)) {
            console.log('Ya existe un producto cargado con el codigo', code)
        } else if (title && description && price && thumbnail && stock) {
            this.products.push({
                id: this.products.length + 1,
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock
            })
            console.log("Producto cargado correctamente con el id:", this.products.length)
        }
        else {
            console.log("Asegurate de haber cargado todos los datos")
        }
    }

    getProducts() {
        if (this.products.length === 0) {
            console.log('No hay productos cargados:', this.products)
        } else {
            console.log("Productos cargados:", this.products)
        }
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.log('Producto no encontrado');
        } else {
            console.log(product);
        }
    }
}

//////////////////////////////////////////////////
//////////////////////////////////////////////////
////////////// TESTING STARTS HERE ///////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

const manager = new ProductManager()

//Llamo a getProducts() para conseguir el array vacio y comprobar que no existe ningun producto cargado
//Consola arroja: No hay productos cargados: (0) []
manager.getProducts()

//Agrego un producto con todos los datos cargados correctamente
//Consola arroja: Producto cargado correctamente con el id: 1
manager.addProduct('Coca Cola', 'Gaseosa', 100, 'https:cocacola/coca.jpg', 25, 10)

//Llamo a getProducts para ver el producto recien agregado
//Consola arroja: Productos cargados: (1) [{...}]
manager.getProducts()

//Agrego otro producto con todos los datos cargados correctamente
//Consola arroja: Producto cargado correctamente con el id: 2
manager.addProduct('Sprite', 'Gaseosa', 100, 'https:cocacola/sprite.jpg', "code2", 10)
manager.getProducts()

//Agrego un producto con todos los datos cargados correctamente pero que repite codigo con el producto cargado anteriormente
//Consola arroja: Ya existe un producto cargado con el codigo 25
manager.addProduct('Pepsi', 'Gaseosa', 100, 'https:cocacola/pepsi.jpg', 25, 10)

//Agrego un producto con un dato menos (en este caso, la descripcion)
//Consola arroja: Asegurate de haber cargado todos los datos
manager.addProduct('Fanta', 100, 'https:cocacola/fanta.jpg', 5, 10)

//Llamo al metodo getProductById con el id de un producto que existe
//Consola arroja el resultado con el producto que coincide con el id
manager.getProductById(2)

//Llamo al metodo getProductById con el id de un producto que no existe
//Consola arroja: Producto no encontrado
manager.getProductById(25)