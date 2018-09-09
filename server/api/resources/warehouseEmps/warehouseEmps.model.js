import mongoose from 'mongoose';
import { deleteModel } from '../../../db';
const modelName = 'WarehouseEmp';
deleteModel(modelName);
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

export default mongoose.model(modelName, warehouseempsSchema);
