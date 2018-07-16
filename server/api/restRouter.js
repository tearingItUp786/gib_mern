import express from 'express';
import productRouter from './resources/product/product.restRouter';
import apiErrorHandler from './modules/errorHandler';

const restRouter = express.Router();

restRouter.use('/product', productRouter);
restRouter.use(apiErrorHandler);

export default restRouter;
