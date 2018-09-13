import { mapKeys } from 'lodash';
import brcModel from './brc.model';
import volumeModel from '../volume/volume.model';
import productTypeModel from '../productTypes/productTypes.model';
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

const getOne = model => (req, res, next) => {
  console.log(req.params.id);
  model
    .findById(req.params.id)
    .populate('warehouse')
    .populate('product')
    .populate({
      path: 'productType',
      populate: {
        path: 'volumes',
        model: 'Volume'
      }
    })
    .then(doc => res.send(doc))
    .catch(err => next(err));
};

const getAll = model => (req, res, next) => {
  // create the order by objects that are needed
  const orderBySorts = createOrderBySortObject(req.query);

  // reduce the objects created by orderbysortobjects to be just one object
  var reducedObjects = orderBySorts.reduce((accum, currVal) => {
    const key = Object.keys(currVal)[0];
    const value = Object.values(currVal)[0];
    if (key && value) {
      accum[key.toString()] = Number(value);
      return accum;
    }
    return accum;
  }, {});

  // if the sort object is empty, set the default sort to just be by product.name
  if (
    Object.keys(reducedObjects).length === 0 &&
    reducedObjects.constructor === Object
  ) {
    reducedObjects = { 'product.name': 1 };
  }

  // the whole purpose of using the aggregationg function is so that I can sort based off
  // the request sent by the user
  // it isn't really possible with the original populate methods.
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
      { $unwind: '$productType' },
      {
        $lookup: {
          from: 'volumes',
          localField: 'productType.volumes',
          foreignField: '_id',
          as: 'productType.volumes'
        }
      }
    ])
    .then(docs => res.status(201).json(docs))
    .catch(err => next(err));
};

const addOne = model => (req, res, next) => {
  const { volume, productType } = req.body;
  productTypeModel
    .findById(productType)
    .populate('volumes')
    .then(docs => {
      if (docs) {
        const volumeExists = docs.volumes.filter(
          (currObj, index) => currObj.volume == volume
        );
        if (volumeExists.length > 0) {
          return model.create(req.body).then(doc => res.status(201).json(doc));
        }
      }
      throw new Error('No volume found');
    })
    .catch(err => next(err));
};

const getOldestBRCSArray = model => (req, res, next) => {
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
      { $unwind: '$productType' },
      {
        $lookup: {
          from: 'volumes',
          localField: 'productType.volumes',
          foreignField: '_id',
          as: 'productType.volumes'
        }
      },
      {
        $group: {
          _id: '$product.name',
          brcs: {
            $push: {
              brcId: '$_id',
              volume: '$volume',
              dateCode: '$dateCode'
            }
          }
        }
      }
    ])
    .then(docs => {
      // if the brc has the same volume,
      // check to see if the date code is less
      const brcsArray = docs.map((curDoc, index) => {
        const docCopy = { ...curDoc };
        const newBrcs = docCopy.brcs.reduce((accum, val) => {
          // volume already exists in this array
          const matchingVol = accum.find(
            accumVal => accumVal.volume === val.volume
          );
          if (matchingVol) {
            if (matchingVol.dateCode > val.dateCode) {
              accum[accum.indexOf(matchingVol)] = val;
            }
          } else {
            accum.push(val);
          }
          return accum;
        }, []);

        docCopy.brcs = newBrcs;
        return docCopy;
      });

      return brcsArray;
    })
    .then(docs => res.send(docs));
};

const overRide = {
  getAll: getAll(brcModel),
  getOne: getOne(brcModel),
  addOne: addOne(brcModel),
  getOldestBRCSArray: getOldestBRCSArray(brcModel)
};

export default generateControllers(brcModel, overRide);
