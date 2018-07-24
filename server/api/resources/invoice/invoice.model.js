import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['Inbound, Outbound']
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

export default mongoose.model('Invoice', invoiceSchema);
