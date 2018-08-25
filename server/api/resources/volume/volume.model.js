import mongoose from 'mongoose';

const volumeSchmea = new mongoose.Schema({
  volume: {
    type: String,
    required: true
  }
});

volumeSchmea.index({ volume: 1 }, { unique: true });

export default mongoose.model('Volume', volumeSchmea);
