import express from 'express';
import warehouseEmpsController from './warehouseEmps.controller';

const warehouseEmpsRouter = express.Router();
warehouseEmpsRouter.param('id', warehouseEmpsController.findById);

warehouseEmpsRouter
  .route('/')
  .get(warehouseEmpsController.getAll)
  .post(warehouseEmpsController.addOne);

warehouseEmpsRouter
  .route('/:id')
  .get(warehouseEmpsController.getOne)
  .put(warehouseEmpsController.updateOne)
  .delete(warehouseEmpsController.deleteOne);

export default warehouseEmpsRouter;
