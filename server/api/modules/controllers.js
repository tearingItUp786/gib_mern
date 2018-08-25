/**
 * Basic Controllers that each Model will need.
 * Find one, get one, get all, add one, delete one, update one
 */
import merge from 'lodash/merge';

const basicControllers = {
  getAll(model) {
    return model.find({});
  },

  getOne(docToSend) {
    return Promise.resolve(docToSend);
  },

  addOne(model, docToAdd) {
    return model.create(docToAdd);
  },

  updateOne(docToUpdate, update) {
    merge(docToUpdate, update);
    return docToUpdate.save();
  },

  deleteOne(docToRemove) {
    return docToRemove.remove();
  },

  findById(model, id) {
    return model.findById(id);
  }
};

const getOne = () => (req, res, next) =>
  basicControllers
    .getOne(req.docFromId)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error));

const getAll = model => (req, res, next) =>
  basicControllers
    .getAll(model)
    .then(docs => res.json(docs))
    .catch(err => next(err));

const addOne = model => (req, res, next) =>
  basicControllers
    .addOne(model, req.body)
    .then(doc => res.status(201).json(doc))
    .catch(err => next(err));

const updateOne = () => (req, res, next) =>
  basicControllers
    .updateOne(req.docFromId, req.body)
    .then(doc => {
      res.status(201).json(doc);
    })
    .catch(error => next(error));

const deleteOne = () => (req, res, next) =>
  basicControllers
    .deleteOne(req.docFromId)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error));

const findById = model => (req, res, next, id) =>
  basicControllers
    .findById(model, id)
    .then(doc => {
      if (!doc) {
        next(new Error('Doc not found error'));
      } else {
        req.docFromId = doc;
        next();
      }
    })
    .catch(err => next(err));

function generateContollers(model, extraControllers = {}) {
  const own = {
    findById: findById(model),
    getAll: getAll(model),
    addOne: addOne(model),
    updateOne: updateOne(),
    deleteOne: deleteOne(),
    getOne: getOne()
  };

  return { ...own, ...extraControllers };
}

export default generateContollers;
