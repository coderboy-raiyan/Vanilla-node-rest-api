const { find, findById, create } = require('../models/productModels');
const getPostData = require('../utils/getPostData');

async function getProducts(_, res) {
    try {
        const products = await find();
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ success: true, data: products }));
    } catch (error) {
        console.log(error);
    }
}
async function getProduct(_, res, id) {
    try {
        const product = await findById(id);

        if (product) {
            res.writeHead(200, { 'content-type': 'application/json' });
            res.end(JSON.stringify({ success: true, data: product }));
        } else {
            res.writeHead(404, { 'content-type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Product not found' }));
        }
    } catch (error) {
        console.log(error);
    }
}
async function createProduct(req, res) {
    try {
        const { name, description, price } = JSON.parse(await getPostData(req));
        if (!name || !description || !price) {
            res.writeHead(500, { 'content-type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Fill Product details Properly' }));
            return;
        }
        const newProduct = await create({ name, description, price });
        res.writeHead(201, { 'content-type': 'application/json' });
        res.end(JSON.stringify(newProduct));
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
};
