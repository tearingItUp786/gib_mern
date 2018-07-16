import express from 'express';
import employeeController from './employee.controller';

const employeeRouter = express.Router();

employeeRouter.param('id', employeeController.findById);

employeeRouter
  .route('/')
  .get(employeeController.getAll)
  .post(employeeController.addOne);

employeeRouter
  .route('/:id')
  .get(employeeController.getOne)
  .put(employeeController.updateOne)
  .delete(employeeController.deleteOne);

export default employeeRouter;
