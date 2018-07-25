import express from 'express';
import brcController from './brc.controller';

const brcRouter = express.Router();
brcRouter.param('id', brcController.findById);

brcRouter
  .route('/')
  .get(brcController.getAll)
  .post(brcController.addOne);

brcRouter
  .route('/:id')
  .get(brcController.getOne)
  .put(brcController.updateOne)
  .delete(brcController.deleteOne);

export default brcRouter;
