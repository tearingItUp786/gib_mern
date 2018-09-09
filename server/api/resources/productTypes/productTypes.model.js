import mongoose from 'mongoose';
import { deleteModel } from '../../../db';
const modelName = 'ProductType';
deleteModel(modelName);
const productTypesSchema = new mongoose.Schema({
  typeName: {
    type: String,
    required: true
  },
  volumes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Volume'
    }
  ]
});

productTypesSchema.index({ typeName: 1 }, { unique: true });

export default mongoose.model(modelName, productTypesSchema);
