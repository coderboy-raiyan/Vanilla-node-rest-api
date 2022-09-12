const http = require('http');
const products = require('./data/products.json');

const server = http.createServer();
const PORT = process.env.PORT || 5000;

server.on('request', (req, res) => {
    if (req.url === '/api/products' && req.method === 'GET') {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(products));
    } else {
        res.writeHead(404, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not Found' }));
    }
});

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
