const mongoose = require('mongoose')

const FriendSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: 'First name is required',
  },
  lastName: {
    type: String,
    required: 'Last name is required',
  },
  email: {
    type: String,
    required: 'Email is required',
    unique: 'This email is taken',
  },
})
module.exports = mongoose.model('Friend', FriendSchema)