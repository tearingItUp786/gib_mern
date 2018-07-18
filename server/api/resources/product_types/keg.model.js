import mongoose from 'mongoose';

const kegSchema = new mongoose.Schema({
  volume: {
    type: String,
    enum: ['50 L', '30 L', '20 L'],
    required: true
  }
});

export default mongoose.model('Keg', kegSchema);
