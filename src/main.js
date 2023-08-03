import express from 'express';
import ProductManager from './productManager.js';

const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => () => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});