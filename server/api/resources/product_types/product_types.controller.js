import productTypes from './product_types.model';
import generateControllers from '../../modules/controllers';

const addOne = model => (req, res, next) =>
  // first check if we have a typeName with the same as the request in our database
  model
    .findOne({ typeName: req.body.typeName })
    .then(doc => {
      if (doc) {
        const requestVolume = req.body.volume;
        // if we have a doc, check if the specified volume in the request
        // already exists in the array of volumes
        if (doc.volume.indexOf(requestVolume) > -1) {
          res.status(422).send('Product type with this volume already exists');

          // if we don't have the volume in the doc then we add it and then save the doc
        } else {
          doc.volume.push(requestVolume);
          doc.save().then(updatedDoc => res.status(201).json(updatedDoc));
        }
      } else {
        model.create(req.body).then(addedDoc => res.status(201).json(addedDoc));
      }
    })
    .catch(err => next(err));

const overRides = {
  addOne: addOne(productTypes)
};

export default generateControllers(productTypes, overRides);
