import mongoose from 'mongoose';

const productTypesSchema = new mongoose.Schema({
  typeName: {
    type: String,
    required: true
  },
  volumesAvailable: [
    {
      type: String,
      required: true
    }
  ]
});

export default mongoose.model('ProductTypes', productTypesSchema);
