const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    
    userId: mongoose.Schema.Types.ObjectId,
    roomCreatedDate: {
        type: Date,
        default: Date.now
    },
    userList: [mongoose.Schema.Types.ObjectId],
    
})

module.exports = roomSchema