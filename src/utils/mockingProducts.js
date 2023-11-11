import { faker } from "@faker-js/faker";



const generateProducts = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.number.int(100),
        code: faker.string.uuid(),
        category: faker.commerce.department(),
        status: faker.datatype.boolean(),
    }
}

const generateRandomProducts = (quantity) => {
    const products = [];
    for (let i = 0; i < quantity; i++) {
        products.push(generateProducts());
    }
    return products;
}

export default generateRandomProducts;
