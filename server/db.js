import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

function connect(dbURL = process.env.DB_URI) {
  return mongoose.connect(
    dbURL,
    {
      useNewUrlParser: true
    }
  );
}

export default connect;
