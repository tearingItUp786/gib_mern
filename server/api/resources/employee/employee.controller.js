import generateControllers from '../../modules/controllers';
import Employee from './employee.model';

const getAll = model => (req, res, next) =>
  model
    .find({})
    .select('-password')
    .then(docs => {
      res.json(docs);
    })
    .catch(err => next(err));

const overWrite = {
  getAll: getAll(Employee)
};

export default generateControllers(Employee, overWrite);
