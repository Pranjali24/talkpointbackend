const mongoose = require('mongoose')

const organizationSchema = require('./collections/organization')
const userSchema = require('./collections/user')
const permissionSchema = require('./collections/permission')
const roomSchema = require('./collections/room')


mongoose.connect('mongodb://localhost:27017/talkpointback', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Database Connected !') )
.catch(() => console.log('Databse Connection Failed !') )


const Organization = new mongoose.model('organization', organizationSchema)
const User = new mongoose.model('user', userSchema)
const Permission = new mongoose.model('permission', permissionSchema)
const Room = new mongoose.model('room', roomSchema)


module.exports = { User, Permission, Organization, Room }
