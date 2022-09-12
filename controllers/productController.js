const { find, findById } = require('../models/productModels');

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

module.exports = {
    getProducts,
    getProduct,
};
