import express from 'express';
import productRouter from './resources/product/product.restRouter';
import warehouseRouter from './resources/warehouse/warehouse.restRouter';
import employeeRouter from './resources/employee/employee.restRouter';
import apiErrorHandler from './modules/errorHandler';
import productTypesRouter from './resources/productTypes/productTypes.restRouter';
import invoiceRouter from './resources/invoice/invoice.restRouter';
import warehouseEmpsRouter from './resources/warehouseEmps/warehouseEmps.restRouter';

const restRouter = express.Router();

restRouter.use('/product', productRouter);
restRouter.use('/producttypes', productTypesRouter);
restRouter.use('/warehouse', warehouseRouter);
restRouter.use('/employee', employeeRouter);
restRouter.use('/invoice', invoiceRouter);
restRouter.use('/warehouseemps', warehouseEmpsRouter);
restRouter.use(apiErrorHandler);

export default restRouter;
