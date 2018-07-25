import mongoose from 'mongoose';

const brcSchema = new mongoose.Schema(
  {
    brc: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Invoices'
    },
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Warehouses'
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('BRC', brcSchema);
