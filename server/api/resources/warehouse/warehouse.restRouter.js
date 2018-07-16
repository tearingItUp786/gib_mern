import express from 'express';
import warehouseController from './warehouse.controller';

const warehouseRouter = express.Router();

warehouseRouter.param('id', warehouseController.findById);

warehouseRouter
  .route('/')
  .get(warehouseController.getAll)
  .post(warehouseController.addOne);

warehouseRouter
  .route('/:id')
  .get(warehouseController.getOne)
  .put(warehouseController.updateOne)
  .delete(warehouseController.deleteOne);

export default warehouseRouter;
