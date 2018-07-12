import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  volume: {
    type: String,
    enum: ['Flat 6x4 Cans', 'Flat 6x4 Bottles', '12 Pack Bottles', '12 Pack Cans', '24 Case x 473 ml can']
  }
});

export default mongoose.model('Package', packageSchema);
