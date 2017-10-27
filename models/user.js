const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: false,
    sparse: true,
    unique: true
  },
  google: {
    id: {
      type: String,
      required: false,
      unique: true,
      sparse: true
    },
    email: String
  },
  facebook: {
    id: {
      type: String,
      required: false,
      unique: true,
      sparse: true
    },
    email: String
  }
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', userSchema);

