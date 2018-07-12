import mongoose from 'mongoose';

const productTypesSchema = new mongoose.Schema({
  typeName: {
    type: String,
    enum: ['Keg', 'Package']
  },
  volume: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'typeName'
  }
});

export default mongoose.model('Product_types', productTypesSchema);
