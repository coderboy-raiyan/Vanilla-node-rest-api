// eslint-disable-next-line prettier/prettier
const { find, findById, create, update, findByIdAndDelete } = require('../models/productModels');
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
async function updateProduct(req, res, id) {
    try {
        const product = await findById(id);

        if (!product) {
            res.writeHead(404, { 'content-type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Product not found' }));
            return;
        }
        const { name, description, price } = JSON.parse(await getPostData(req));

        const productData = {
            name: name || product.name,
            description: description || product.description,
            price: price || product.price,
        };

        const newProduct = await update(id, productData);
        res.writeHead(201, { 'content-type': 'application/json' });
        res.end(JSON.stringify(newProduct));
    } catch (error) {
        console.log(error);
    }
}

async function removeProduct(req, res, id) {
    try {
        const product = await findById(id);

        if (!product) {
            res.writeHead(404, { 'content-type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Product not found' }));
            return;
        }

        const deleteProduct = await findByIdAndDelete(id);
        res.writeHead(201, { 'content-type': 'application/json' });
        res.end(
            JSON.stringify({
                success: true,
                message: 'Product Deleted Successfully',
                data: deleteProduct,
            }),
        );
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    removeProduct,
};
