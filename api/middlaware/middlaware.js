module.exports = function (req, res, next) {
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", req.headers['access-control-request-headers']);

    if (req.method === 'OPTIONS') {
        res.status(204).end();
        return;
    }
    next();
};