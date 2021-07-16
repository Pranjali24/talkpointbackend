const mongoose = require('mongoose')

const organizationSchema = new mongoose.Schema({
    
   organizationName: String,
   organizationEmail: String,
   organizationAddress: String,
   organizationPhone: Number,

})

module.exports = organizationSchema