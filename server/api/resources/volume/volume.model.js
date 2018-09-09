import mongoose from 'mongoose';
import { deleteModel } from '../../../db';
const modelName = 'Volume';
deleteModel(modelName);
const volumeSchema = new mongoose.Schema({
  volume: {
    type: String,
    required: true
  }
});

volumeSchema.index({ volume: 1 }, { unique: true });

export default mongoose.model(modelName, volumeSchema);
