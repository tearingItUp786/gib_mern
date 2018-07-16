import express from 'express';
import productRouter from './resources/product/product.restRouter';
import warehouseRouter from './resources/warehouse/warehouse.restRouter';
import employeeRouter from './resources/employee/employee.restRouter';
import apiErrorHandler from './modules/errorHandler';

const restRouter = express.Router();

restRouter.use('/product', productRouter);
restRouter.use('/warehouse', warehouseRouter);
restRouter.use('/employee', employeeRouter);
restRouter.use(apiErrorHandler);

export default restRouter;
