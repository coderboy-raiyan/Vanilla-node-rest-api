const dbPath = require('../utils/dbPath');
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
    return new Promise((resolve) => {
        const newProduct = { id: String(products.length + 1), ...product };
        products.push(newProduct);
        writeDataToFile(dbPath, products);
        resolve(newProduct);
    });
}
async function update(id, product) {
    return new Promise((resolve) => {
        const index = products.findIndex((p) => p.id === id);
        products[index] = { id, ...product };
        writeDataToFile(dbPath, products);
        resolve(products[index]);
    });
}

async function findByIdAndDelete(id) {
    return new Promise((resolve) => {
        const modifiedProducts = products.filter((product) => product.id !== id);
        writeDataToFile(dbPath, modifiedProducts);
        resolve(products.find((p) => p.id === id));
    });
}

module.exports = {
    find,
    findById,
    create,
    update,
    findByIdAndDelete,
};
