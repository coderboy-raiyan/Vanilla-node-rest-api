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
        res.writeHead(404, { 'content-type': 'text/html' });
        res.end(
            `<pre class="notranslate"><code>
                # Routes
                GET      /api/products
                POST     /api/products
                GET      /api/products/:id
                PUT      /api/products/:id
                DELETE   /api/products/:id
                
                </code></pre>
            `,
        );
    }
});

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
