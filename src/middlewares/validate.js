export const validateBody = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        allowUnknown: false,
        convert: true
    });

    if (error) {
        const message = error.details.map(d => d.message).join(', ');
        const err = new Error(message);
        err.statusCode = 400;
        err.isJoi = true;
        return next(err);
    }

    req.body = value;
    next();
};
