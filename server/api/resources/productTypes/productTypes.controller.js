import { merge } from 'lodash';
import mongoose from 'mongoose';
import productTypes from './productTypes.model';
import generateControllers from '../../modules/controllers';

const getAll = model => (req, res, next) => {
  model
    .find({})
    .populate('volumes')
    .exec()
    .then(docs => res.json(docs))
    .catch(err => next(err));
};

const updateOne = () => (req, res, next) => {
  merge(req.docFromId, req.body);

  // attempt a conversion from the strings passed in to be object ids
  req.docFromId.volumes = req.body.volumes.map(item =>
    mongoose.Types.ObjectId(item)
  );

  console.log('doc from id', req.docFromId);

  req.docFromId
    .save()
    .then(doc => {
      res.status(201).json(doc);
    })
    .catch(error => next(error));
};

const overRide = {
  getAll: getAll(productTypes),
  updateOne: updateOne()
};

export default generateControllers(productTypes, overRide);
