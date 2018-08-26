import generateControllers from '../../modules/controllers';
import Product from './product.model';

const getAll = model => (req, res, next) => {
  model
    .find({})
    .sort({ name: 'asc' })
    .then(docs => res.status(201).json(docs))
    .catch(err => next(err));
};

const overRides = {
  getAll: getAll(Product)
};

export default generateControllers(Product, overRides);
