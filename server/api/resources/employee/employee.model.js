import mongoose from 'mongoose';
import random from 'lodash/random';

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
  }
});

employeeSchema.pre('validate', async function handlePreSave() {
  console.log(`pre validate`);

  if (!this.username) {
    this.username = `${this.name.lname}_${this.name.fname}`;

    let doc = await this.constructor.findOne({ username: this.username });
    while (doc) {
      const newUsername = this.username + random(0, 10000);
      this.username = newUsername;
      doc = await this.constructor.findOne({ username: this.username });
    }
  }
});

export default mongoose.model('Employee', employeeSchema);
