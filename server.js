const http = require('http');
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
} = require('./controllers/productController');

const server = http.createServer();
const PORT = process.env.PORT || 5000;

server.on('request', (req, res) => {
    const pathUrl = req.url.split('/');
    console.log(pathUrl);
    if (pathUrl[1] === 'api' && pathUrl[2] === 'products' && req.method === 'GET') {
        if (pathUrl[3]) {
            // Get A Single Product
            getProduct(req, res, pathUrl[3]);
        } else {
            // Get All Products
            getProducts(req, res);
        }
    } else if (pathUrl[1] === 'api' && pathUrl[2] === 'products' && req.method === 'POST') {
        createProduct(req, res);
    } else if (pathUrl[1] === 'api' && pathUrl[2] === 'products' && req.method === 'PUT') {
        if (pathUrl[3]) {
            updateProduct(req, res, pathUrl[3]);
        }
    } else {
        res.writeHead(404, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not Found' }));
    }
});

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
