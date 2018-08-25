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

productTypesSchema.index({ typeName: 1 }, { unique: true });

export default mongoose.model('ProductType', productTypesSchema);
