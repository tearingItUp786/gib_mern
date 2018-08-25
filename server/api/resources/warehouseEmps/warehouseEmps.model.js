import mongoose from 'mongoose';

const warehouseempsSchema = new mongoose.Schema({
  warhouseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'warehouses'
  },

  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employees'
  }
});

export default mongoose.model('WarehouseEmp', warehouseempsSchema);
