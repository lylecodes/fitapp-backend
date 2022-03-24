const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePic: {
    type: String,
    default: "https://i.stack.imgur.com/l60Hf.png",
  },
  stats: [{
    age: {
      type: Number,
    },
    sex: {
      type: String,
      enum: ['male', 'female']
    },
    weight: {
      type: Number,
    },
    height: {
      type: Number,
    }
  }],
  userType: {
    type: String,
    enum : ['user','admin'],
    default: 'user'
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    required: true,
  },
  dateUpdated: {
    type: Date,
  }
});



module.exports = User = mongoose.model("Users", UserSchema);
