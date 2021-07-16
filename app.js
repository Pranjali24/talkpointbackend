const express = require('express')
require('dotenv').config()
const path = require('path')

const app = express()

const PORT = process.env.PORT || "3000";

// all routers file
const main = require('./routers/main')
// Routes
const user = require('./routers/user')
const login = require('./routers/login')
const organization = require('./routers/organization')
const room = require('./routers/room')


/** Create socket connection */
const server = require('http').createServer(app)

const io = require('socket.io')(server, {
    cors: {
        origins: ['http://localhost:4200']
    }
   })

const cors = require('./auth/cors')
const WebSockets = require('./utlis/WebSockets')


app.use(express.json())
app.use(cors)
// app.use(main)
app.use(express.urlencoded({extended:false}))
app.use("/",express.static(path.join(__dirname, "public", "talkPointWebApp")))

app.use('/api/user/', user)
app.use('/api/login', login)
app.use('/api/organization', organization)
app.use('/api/room', room)

// Start socket 
WebSockets.start(io)

//  Global Setting for socket
app.set('io', io);


//  show forntend and backend same URL
// app.use((req,res,next) => {
//     res.sendFile(path.join(__dirname, "angular", "index.html"));
// })
app.use('/', (req,res,next) =>{
   res.sendFile(path.join(__dirname, "public", "talkPointWebApp", "index.html"));
})

server.listen(PORT , '192.168.1.21', () => {
    console.log(`Listening on port:: http://192.168.1.21:${PORT}`)
});