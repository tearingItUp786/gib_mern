import express from 'express';
import invoiceController from './invoice.controller';

const invoiceRouter = express.Router();
invoiceRouter.param('id', invoiceController.findById);

invoiceRouter
  .route('/')
  .get(invoiceController.getAll)
  .post(invoiceController.addOne);

invoiceRouter
  .route('/:id')
  .get(invoiceController.getOne)
  .put(invoiceController.updateOne)
  .delete(invoiceController.deleteOne);

export default invoiceRouter;
