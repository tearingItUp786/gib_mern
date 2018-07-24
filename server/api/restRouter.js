import express from 'express';
import productRouter from './resources/product/product.restRouter';
import warehouseRouter from './resources/warehouse/warehouse.restRouter';
import employeeRouter from './resources/employee/employee.restRouter';
import apiErrorHandler from './modules/errorHandler';
import productTypesRouter from './resources/product_types/product_types.restRouter';
import invoiceRouter from './resources/invoice/invoice.restRouter';

const restRouter = express.Router();

restRouter.use('/product', productRouter);
restRouter.use('/producttypes', productTypesRouter);
restRouter.use('/warehouse', warehouseRouter);
restRouter.use('/employee', employeeRouter);
restRouter.use('/invoice', invoiceRouter);
restRouter.use(apiErrorHandler);

export default restRouter;
