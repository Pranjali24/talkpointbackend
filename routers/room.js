const express = require('express')
const router = express.Router()

const roomController = require('../controllers/room')

const { checkAuth } = require('../auth/auth')

router
.get('/',(req,res,next)=>{
    res.json({
        message:'room id'
    })
})
    // Create New Rooms
    .post('/', checkAuth, roomController.createRoom)
    
    
module.exports = router;