import { faker } from "@faker-js/faker";

const generateProducts = (quantity) => {
    const products = [];
    for (let i = 0; i < quantity; i++) {
        const product = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            stock: faker.number.int(100),
            code: faker.string.uuid(),
            category: faker.commerce.department(),
            status: faker.datatype.boolean(),
        };
        products.push(product);
    }
    return products;
};

export const products = generateProducts(100);