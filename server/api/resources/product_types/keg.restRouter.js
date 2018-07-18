import express from 'express';
import kegController from './keg.controller';

const kegRouter = express.Router();

kegRouter
  .route('/')
  .get(kegController.getAll)
  .post(kegController.addOne);

kegRouter
  .route('/:id')
  .get(kegController.getOne)
  .put(kegController.updateOne)
  .delete(kegController.deleteOne);

export default kegRouter;
