const http = require('http');
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    removeProduct,
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
    } else if (pathUrl[1] === 'api' && pathUrl[2] === 'products' && req.method === 'DELETE') {
        if (pathUrl[3]) {
            removeProduct(req, res, pathUrl[3]);
        }
    } else {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.end(
            `<div style="display: flex; justify-content:center; padding-top : 100px">
            <div>
            <h1> # Routes</h1>
            <ul>
            <li> GET   &nbsp &nbsp   /api/products</li>
            <li> POST    &nbsp &nbsp  &nbsp /api/products</li>
            <li> GET    &nbsp &nbsp   /api/products/:id</li>
            <li> PUT     &nbsp &nbsp  /api/products/:id</li>
            <li> DELETE  &nbsp &nbsp  /api/products/:id</li>
            </ul>
            </div>
            </div>
            `,
        );
    }
});

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
