import { mapKeys } from 'lodash';
import brcModel from './brc.model';
import volumeModel from '../volume/volume.model';
import generateControllers from '../../modules/controllers';

// function to turn queries into sortByObject
const product_type = 'product_type';
const product_name = 'product_name';
const invoice = 'invoice';

const createOrderBySortObject = query =>
  Object.keys(query).map(objKey => {
    switch (objKey) {
      case 'productType':
        return {
          productType: query[objKey]
        };
      case 'name':
        return {
          'product.name': query[objKey]
        };
      default:
        return {};
    }
  });

const getAll = model => (req, res, next) => {
  // create the order by objects that are needed
  const orderBySorts = createOrderBySortObject(req.query);

  // reduce the objects created by orderbysortobjects to be just one object
  const reducedObjects = orderBySorts.reduce((accum, currVal) => {
    const key = Object.keys(currVal)[0];
    const value = Object.values(currVal)[0];
    if (key && value) {
      accum[key.toString()] = Number(value);
      return accum;
    }
    return accum;
  }, {});

  model
    .aggregate([
      {
        $lookup: {
          from: 'products',
          localField: 'product',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $lookup: {
          from: 'warehouses',
          localField: 'warehouse',
          foreignField: '_id',
          as: 'warehouse'
        }
      },
      { $unwind: '$warehouse' },
      {
        $lookup: {
          from: 'invoices',
          localField: 'invoice',
          foreignField: '_id',
          as: 'invoice'
        }
      },
      { $unwind: '$invoice' },
      {
        $lookup: {
          from: 'producttypes',
          localField: 'productType',
          foreignField: '_id',
          as: 'productType'
        }
      },
      {
        $sort: reducedObjects
      },
      { $unwind: '$productType' }
    ])
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
