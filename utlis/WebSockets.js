module.exports = {
    start: function(io) {
        io.on('connection', function(client) {
            console.log('Connected Socket !',client.id);
            client.emit('login','Hello from serve socket ! ')
            
            client.on('message', message => {
            console.log('emit******',message ,client.id);
            // client.broadcast.emit('message',message)
            io.emit('message',message)
          })

        });
    }
}




// class WebSockets {
    
//     users = []
//     connection(client) {
//         console.log('connected socket');
//         client.emit('login','Hello from serve socket ! ')
//         client.on('message', message => {
//             console.log('emit******',message);
//             // client.broadcast.emit('message',message)
//             io.emit('message',message)
//         })
//     }

// }


// module.exports = new WebSockets