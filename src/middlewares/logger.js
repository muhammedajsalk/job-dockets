const logger = (req, res, next) => {

    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        const log = `${req.method} ${req.originalUrl} - Status: ${res.statusCode} - ${duration}ms`;
        console.log(`[ACCESS] ${log}`);
    });

    next();
};

export default logger