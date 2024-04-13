// user.model.js
const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

// Define the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
