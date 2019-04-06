const logger = (req, res, next) => {
    let d = new Date();
    console.log(
        `${req.protocol}://${req.get('host')}${req.originalUrl}: ${d}`
    );
    next();
};

module.exports = logger;