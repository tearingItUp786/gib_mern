import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import Employee from '../resources/employee/employee.model';

const APP_SECRET = process.env.APP_SECRET || 'secret_token';
const EXPIRE_TIME = process.env.EXPIRE_TIME || '30d';
const checkToken = expressJwt({ secret: APP_SECRET });

const signToken = id => jwt.sign({ id }, APP_SECRET, { expiresIn: EXPIRE_TIME });

export const signIn = (req, res) => {
  // the middleware verify user
  // will return req.user
  // we can then sign the token
  const token = signToken(req.user.id);
  res.json({ token });
};

const decodeToken = () => (req, res, next) => {
  // make it optional to place token on query string
  // if it is, place it on the headers where it should be
  // so checkToken can see it. See follow the 'Bearer 034930493' format
  // so checkToken can see it and decode it

  if (req.query && req.query.access_token) {
    req.headers.authorization = `Bearer ${req.query.access_token}`;
  }

  // this will call next if token is valid
  // and send error if its not. It will attached
  // the decoded token to req.user
  checkToken(req, res, next);
};

const getFreshUser = () => (req, res, next) =>
  Employee.findById(req.user.id)
    .then(user => {
      if (!user) {
        // if no employee was found
        // it was valid JWT data that didn't decode
        // to an employee in our DB.
        // user may have been deleted or the JWT is from elsewhere
        res.status(401).send('Unauthorized');
      } else {
        // update req.employee with fresh user from
        // stale token data
        req.user = user;
        next();
      }
    })
    .catch(error => next(error));

// the middelware that'll take the users response
// based off the response, it will assign req.body with the appropriate
// values
export const verifyUser = (req, res, next) => {
  const { username } = req.body;
  const { password } = req.body;

  if (!username || !password) {
    res.status(400).send('You need a username and password');
    return;
  }

  Employee.findOne({ username }).then(employee => {
    if (!employee) {
      res.status(401).send('No employee was found with that username');
    } else if (!employee.authenticate(password)) {
      res.status(401).send('Wrong password');
    } else {
      req.user = employee;
      next();
    }
  });
};

const protect = [decodeToken(), getFreshUser()];

export default protect;
