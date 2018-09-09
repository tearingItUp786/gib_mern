import mongoose from 'mongoose';
import { deleteModel } from '../../../db';
const modelName = 'Product';
deleteModel(modelName);
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    description: {
      type: String,
      maxLength: 300
    },
    image: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(modelName, productSchema);
