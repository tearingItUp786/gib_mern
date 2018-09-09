import mongoose from 'mongoose';
import { deleteModel } from '../../../db';
const modelName = 'Invoice';
deleteModel(modelName);
const invoiceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['INBOUND', 'OUTBOUND']
    },
    carrier: {
      type: String,
      required: true
    },
    shipper: {
      type: String,
      required: true
    },
    referenceNumber: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(modelName, invoiceSchema);
