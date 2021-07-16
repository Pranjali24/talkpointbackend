const express = require('express')

const app = express()

// Routes
const user = require('./user')
const login = require('./login')
const organization = require('./organization')


app.use('/api/user/', user)
app.use('/api/login', login)
app.use('/api/organization', organization)

// module.exports = 