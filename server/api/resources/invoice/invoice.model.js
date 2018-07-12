import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
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
  }
});

export default mongoose.model('Invoice', invoiceSchema);
