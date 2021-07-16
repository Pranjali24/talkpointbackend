const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
      },
    mobileNumber: {
        type: Number,
        unique: true
      },
    password: String,
    role: String,
    createdAt: {
        type: Date,
        default: Date.now   
    },
    createdBy: mongoose.Schema.Types.ObjectId,
    onlineStatus: {
        type: Boolean,
        default: true
    },
    // lastSeen: Date,
    
})

module.exports = userSchema