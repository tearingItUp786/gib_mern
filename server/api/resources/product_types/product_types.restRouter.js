import express from 'express';
import productTypesController from './product_types.controller';

const productTypesRouter = express.Router();
productTypesRouter.param('id', productTypesRouter.findById);

productTypesRouter
  .route('/')
  .get(productTypesController.getAll)
  .post(productTypesController.addOne);

productTypesRouter
  .route('/:id')
  .get(productTypesController.getOne)
  .put(productTypesController.updateOne)
  .delete(productTypesController.deleteOne);

export default productTypesRouter;
