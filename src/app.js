import express from 'express';
import jobRoutes from './app/job/routes/job.route.js';
import docketRoutes from './app/docket/routes/docket.routes.js';
import globalErrorHandler from './middlewares/errorHandler.js';
import rateLimiter from './middlewares/rateLimiter.js';
import logger from './middlewares/logger.js';

const app = express();
app.use(express.json());

app.use(logger)
app.use(rateLimiter)

app.use('/api/jobs', jobRoutes); 
app.use('/api/jobs', docketRoutes);

app.use(globalErrorHandler);

export default app;
