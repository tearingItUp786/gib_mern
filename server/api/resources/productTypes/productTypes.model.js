import mongoose from 'mongoose';

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

export default mongoose.model('ProductType', productTypesSchema);
