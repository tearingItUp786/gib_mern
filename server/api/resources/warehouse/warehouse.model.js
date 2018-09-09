import mongoose from 'mongoose';
import { deleteModel } from '../../../db';
const modelName = 'Warehouse';
deleteModel(modelName);
const warehouseSchema = new mongoose.Schema({
  address: {
    country: {
      type: String,
      enum: ['Canada'],
      required: true,
      default: 'Canada'
    },
    province: {
      type: String,
      required: true,
      enum: [
        'Alberta',
        'British Columbia',
        'Manitoba',
        'New Brunswick',
        'Newfoundland and Labrador',
        'Northwest Territories',
        'Nova Scotia',
        'Nunavut',
        'Ontario',
        'Prince Edward Island',
        'Quebec',
        'Saskatchewan',
        'Yukon Territory'
      ],
      default: 'British Columbia'
    },
    city: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true,
      unique: true
    },

    street: {
      type: String,
      required: true
    },

    unitNumber: {
      type: String
    }
  }
});

export default mongoose.model(modelName, warehouseSchema);
