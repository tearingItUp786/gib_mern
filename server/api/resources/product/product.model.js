import mongoose from 'mongoose';

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

export default mongoose.model('Product', productSchema);
