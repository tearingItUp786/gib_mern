import express from 'express';
import volumeController from './volume.controller';

const volumeRouter = express.Router();
volumeRouter.param('id', volumeController.findById);

volumeRouter
  .route('/')
  .get(volumeController.getAll)
  .post(volumeController.addOne);

volumeRouter
  .route('/:id')
  .get(volumeController.getOne)
  .put(volumeController.updateOne)
  .delete(volumeController.deleteOne);

export default volumeRouter;
