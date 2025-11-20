import AppError from "../utils/AppError.js";

const requestMap = new Map();

const WINDOW_SIZE_MS = 60 * 1000;
const MAX_REQUESTS = 10;

const rateLimiter = (req, res, next) => {
    const ip = req.ip;                       
    const now = Date.now();                
    const timestamps = requestMap.get(ip) || [];

    const validRequests = timestamps.filter(
        time => time > now - WINDOW_SIZE_MS
    );

    if (validRequests.length >= MAX_REQUESTS) {
        const timeUntilReset =
            validRequests[0] + WINDOW_SIZE_MS - now;

        res.set('Retry-After', Math.ceil(timeUntilReset / 1000));

        return next(
            new AppError('Too many requests. Please try again later.', 429)
        );
    }

    validRequests.push(now);
    requestMap.set(ip, validRequests);
    next();
};

export default rateLimiter;
