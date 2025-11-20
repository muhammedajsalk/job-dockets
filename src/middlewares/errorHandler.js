export default (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something went very wrong!';
    let status = err.status || 'error';

    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(el => el.message).join(', ');
        status = 'fail';
    }

    if (err.code === 11000) {
        statusCode = 409;
        const value = err.keyValue ? Object.values(err.keyValue)[0] : 'record';
        message = `Duplicate field value: "${value}". Please use another value.`;
        status = 'fail';
    }
    
    if (err.isJoi) { 
        statusCode = 400;
        message = err.message || 'Invalid request data.'; 
        status = 'fail';
    }

    res.status(statusCode).json({
        status,
        message
    });
};