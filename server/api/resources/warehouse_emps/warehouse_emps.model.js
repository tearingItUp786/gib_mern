import mongoose from 'mongoose';

const warehouseempsSchema = new mongoose.Schema({
  warhouse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'warehouse',

    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employee'
    }
  }
});

export default mongoose.model('Warehouse_emps', warehouseempsSchema);
