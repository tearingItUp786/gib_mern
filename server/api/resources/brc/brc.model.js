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
      ref: 'Invoice'
    },
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Warehouse'
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Brc', brcSchema);
