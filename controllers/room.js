const { Room } = require('../config/schema')
const { getTokenDetail } = require('../auth/auth')

// Create New Room
exports.createRoom = async (req, res, next) => {
    let decode = await getTokenDetail(req, res, next)
    let { userList } =req.body
    console.log(userList);

    let newRoom = new Room({ userId: decode.id, userList})
    let createRoom = newRoom.save()

    res.status(200).json({
        status: 'success',
        message: 'Room Created Successfully !',
        status_code: '200',
        roomDetails: createRoom
      })


}