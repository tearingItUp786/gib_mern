import brcModel from './brc.model';
import volumeModel from '../volume/volume.model';
import generateControllers from '../../modules/controllers';

const getAll = model => (req, res, next) => {
  model
    .find({})
    .populate('invoice')
    .populate('warehouse')
    .populate('product')
    .populate('productType')
    .then(docs => res.status(201).json(docs))
    .catch(err => next(err));
};

const addOne = model => (req, res, next) => {
  const { volume } = req.body;
  volumeModel
    .findOne({ volume })
    .then(docs => {
      if (docs) {
        return model.create(req.body).then(doc => res.status(201).json(doc));
      }
      throw new Error('No volume found');
    })
    .catch(err => next(err));
};

const overRide = {
  getAll: getAll(brcModel),
  addOne: addOne(brcModel)
};

export default generateControllers(brcModel, overRide);
