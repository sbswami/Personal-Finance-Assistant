const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  dob: {
    type: Date,
  },
  businessName: {
    type: String,
    required: true,
  }
});

module.exports.userSchema = userSchema;
require('../methods/index');
const User = mongoose.model('User', userSchema);
module.exports.User = User;
