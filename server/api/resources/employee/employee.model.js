import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const employeeSchema = new mongoose.Schema({
  username: {
    type: String,
    index: { unique: true, dropDups: true }
  },
  name: {
    fname: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    lname: {
      type: mongoose.Schema.Types.String,
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
    enum: ['ADMIN', 'EMPLOYEE'],
    required: true,
    default: 'employee'
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
