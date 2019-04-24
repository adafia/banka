
const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        res.status(403).send({
            status: 403,
            message: 'Forbidden access (403)'
        });
    }
}

export default checkToken;