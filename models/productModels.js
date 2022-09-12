const products = require('../data/products.json');

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

module.exports = {
    find,
    findById,
};
