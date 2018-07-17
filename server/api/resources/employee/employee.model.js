import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';

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
  }
  // passwordHash: {
  //   required: true,
  //   type: String
  // }
});

export default mongoose.model('Employee', employeeSchema);
