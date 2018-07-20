import mongoose from 'mongoose';
import random from 'lodash/random';
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
  }
});

employeeSchema.pre('validate', async function handlePreValidateEmployee() {
  if (!this.username) {
    this.username = `${this.name.lname}_${this.name.fname}`;

    let doc = await this.constructor.findOne({ username: this.username });
    while (doc) {
      const newUsername = this.username + random(0, 10000);
      this.username = newUsername;
      /*eslint-disable*/
      doc = await this.constructor.findOne({ username: this.username });
      /* eslint-enable */
    }
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
