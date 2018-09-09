import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

// Temporary work around to delete the models for hmr
// This will delete the model in mongoose so that any changes that we make
// will not force us to restart the server application in development mode.
export function deleteModel(key, env = process.env.ENV) {
  if (env === 'local') delete mongoose.connection.models[key];
}

function connect(dbURL = process.env.DB_URI) {
  return mongoose.connect(
    dbURL,
    {
      useNewUrlParser: true
    }
  );
}

export default connect;
