import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const employeeSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: [true, 'Employee must have an ID']
  },
  name: {
    fname: {
      type: String,
      required: true
    },
    lName: {
      type: String,
      required: true
    }
  },
  passwordHash: {
    required: true,
    type: String
  }
});

employeeSchema.methods = {
  authenticate(plainTextPass) {
    return bcrypt.compareSync(plainTextPass, this.password);
  },
  hashPassword(plainTextPass) {
    if (!plainTextPass) {
      throw new Error('Could not save User');
    }

    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainTextPass, salt);
  }
};

export default mongoose.model('Employee', employeeSchema);
