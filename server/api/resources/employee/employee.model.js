import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const employeeSchema = new mongoose.Schema({
  username: {
    type: String,
    index: { unique: true, dropDups: true }
  },
  name: {
    fname: {
      type: String,
      required: true
    },
    lname: {
      type: String,
      required: true
    }
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true
  },
  lastLoginDate: {
    type: Date
  },
  password: {
    required: true,
    type: String
  },
  role: {
    type: String,
    enum: ['ADMIN', 'EMPLOYEE'],
    required: true,
    default: 'EMPLOYEE'
  },
  avatar: {
    type: String
  }
});

employeeSchema.pre('save', async function handlePreSaveEmployee() {
  const user = this;
  if (!user.isModified('password')) {
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user.password, salt);
});

employeeSchema.methods = {
  authenticate(plainTextPassword) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  }
};

export default mongoose.model('Employee', employeeSchema);
