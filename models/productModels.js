const path = require('path');
const products = require('../data/products.json');
const writeDataToFile = require('../utils/writeDataToFile');

function find() {
    return new Promise((resolve) => {
        resolve(products);
    });
}

function findById(id) {
    const findProduct = products.find((product) => product.id === id);
    return new Promise((resolve) => {
        resolve(findProduct);
    });
}

async function create(product) {
    const dbPath = path.join(`${__dirname}`, '..', 'data', 'products.json');
    return new Promise((resolve) => {
        const newProduct = { id: String(products.length + 1), ...product };
        products.push(newProduct);
        writeDataToFile(dbPath, products);
        resolve(newProduct);
    });
}

module.exports = {
    find,
    findById,
    create,
};
