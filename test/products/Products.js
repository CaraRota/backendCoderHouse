import mongoose from "mongoose";
import { getProducts, getProductById, postProduct, putProduct, deleteProduct } from "../../src/controllers/products.js";
import Assert from "assert";
import 'dotenv/config';

await mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => console.log('Conectado a MongoDB (test mode: on)'))
    .catch(error => console.log('Error al conectar a MongoDB: ', error));

const assert = Assert.strict;

describe('Consultar todos los productos de mi aplicacion', () => {
    it('Devuelve un array con todos los productos', async () => {
        const req = { query: {} };
        const res = { status: () => { }, send: () => { } };

        const response = await getProducts(req, res);
        assert.ok(Array.isArray(response.message.docs));
    });
    it('Devuelve un producto por ID', async () => {
        const req = { params: { pid: '6501bde46f766330b7fea83f' } };
        const res = { status: () => { }, send: () => { } };

        const response = await getProductById(req, res);
        assert.ok(response.message._id === '6501bde46f766330b7fea83f');
    });
});