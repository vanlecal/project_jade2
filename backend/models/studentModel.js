// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   index: { type: String, required: true },
//   phone: { type: String, required: true },
//   role: { type: String, enum: ['student', 'lecturer'], required: false },
// });

// const User = mongoose.model('User', userSchema);
// module.exports = User;




const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  index: { type: String, required: true },
  phone: { type: String, required: true },
  sex: { type: String, required: true },
  program: { type: String, required: true },
  role: { type: String, enum: ['student', 'lecturer'], required: false },
});

const User = mongoose.model('StudentUser', userSchema);
module.exports = User;
