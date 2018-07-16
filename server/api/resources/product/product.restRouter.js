import express from 'express';
import productController from './product.controller';

const productRouter = express.Router();

productRouter.param('id', productController.findById);

productRouter
  .route('/')
  .get(productController.getAll)
  .post(productController.addOne);

productRouter
  .route('/:id')
  .get(productController.getOne)
  .delete(productController.deleteOne);

export default productRouter;
