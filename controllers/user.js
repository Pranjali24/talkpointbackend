const bcrypt = require('bcryptjs')

const { User, Permission } = require('../config/schema')
// const { getCurrentDateUTC, changeDateIntoLocale } = require('../utlis/UTCDate')
const { getTokenDetail } = require('../auth/auth')

// ******************Sub Admin and User registration*******************
exports.registrationUser = async (req, res, next) => {
  console.log(req.body);
  console.log(req.headers)
  let decode = await getTokenDetail(req, res, next)
  console.log('Token in user module ************',decode);
  
  let { firstName, lastName, email, password, mobileNumber, role,
         isBlockUser, isDeleteUser, isVideoCall, isBookmark, isAudioCall, isStatusView, isSetting
       } = req.body
  
  
  let hashPassword = await bcrypt.hash(password, 10)
  let newUserObj = new User({
    firstName, lastName, email, password: hashPassword, role, mobileNumber, createdBy: decode.id  })
   
  // save user info in User Collection
  let newUser = await newUserObj.save()

 //  permission define based on userid generated
 let userPermission = new Permission (
   { userId:newUser._id , isBlockUser, isDeleteUser, isVideoCall, isBookmark, isAudioCall, isStatusView, isSetting })

 let userPermissions = await userPermission.save()

  res.status(200).json({
      status: 'success',
      message: 'User Registred Successfully !',
      status_code: '200',
      vaild: true,
      data: newUser,
      permissions: userPermissions
  })

}

// *************** Update Admin or User ***************************

exports.updateUser = async (req, res, next) => {
 
  console.log('hello : ',req.body);

  // let { id , formData } = req.body
  // let { firstName, lastName, role } = formData

  // let hashPassword = await bcrypt.hash(password, 10)
  // console.log('update api : ', req.body);
  // let { isBlockUser, isDeleteUser, isVideoCall, isBookmark, isAudioCall, isStatusView, isSetting } = formData

  // let newUserObj ={ firstName, lastName, password: hashPassword, role }
  // let userPermission = { isBlockUser, isDeleteUser, isVideoCall, isBookmark, isAudioCall, isStatusView, isSetting }

  let updateUser = await User.updateOne({ _id : req.body.id }, req.body.formUserData )
  let updatePermission = await Permission.updateOne({ userId: req.body.id }, req.body.formPermissionData )
  
   if(updateUser.n > 0 && updatePermission.n > 0) {
     console.log('in update 1*************',updateUser.n);
    res.status(200).json({
      status: 'success',
      message: 'User Update Successfully !',
      status_code: '200'
    })
   }else {
       //  userid is not valid
       res.status(404).json({
        status: 'failed',
        message: 'User Id Not Vaild !',
        status_code: '404'
      })
   }

}

// *************** Get Single User Details and Permission**************************
exports.getSingleUser = async (req, res, next) => {
  let userId = req.params.userid
  let getSingleUser = await User.findOne( { _id: userId } )
  let getSingleUserPermission = await Permission.findOne({ userId : userId})

  if(getSingleUser)  {
    res.status(200).json({
      status: 'success',
      message: 'User Details Fetch !',
      status_code: '200',
      userData: getSingleUser,
      permission: getSingleUserPermission
    })
  }else{
    res.status(404).json({
      status: 'failed',
      message: 'User Id Not Vaild !',
      status_code: '404'
    })
  }
}

// *************** Get All Admins and Users **************************

exports.getAllUsers = async (req, res, next) =>{
  // join user and permission 
  let getAllUsers = await User.aggregate([{
    $lookup:
      {       
        from: "permissions",
        as: "permission",
        localField: "_id",
        foreignField: "userId",
        
      }
 }])

  // Filter sub admins details
  let getAdmin = getAllUsers.filter(user => {
    return user.role !== 'Super Admin' && user.role !== 'User'
  })
  // Filter users details
  let getUser = getAllUsers.filter(user => {
    return user.role !== 'Super Admin' && user.role !== 'Sub Admin'
  })

  res.status(200).json({
    status: 'success',
    message: 'All User Data successfully !',
    status_code: '200',
    adminData: getAdmin,
    userData: getUser
  })

}


// ******************* Delete One User or Sub admin *********************

exports.deleteOneUser = async (req, res, next) =>{
 let userId = req.params.userid
 console.log('delete on user ',userId);

 let deleteUser = await User.deleteOne({ _id : userId})
 let deletePermission = await Permission.deleteOne({ userId : userId })

 //  check id is valid or not
  if(deleteUser.n >0 && deletePermission.n > 0){
    console.log('single delete : ',deleteUser, '**********', deletePermission);
    res.status(200).json({
     status: 'success',
     message: 'User Deleted successfully !',
     status_code: '200'
    })
 }
 else{
  //  userid is not valid
  res.status(404).json({
    status: 'failed',
    message: 'User Id Not Vaild !',
    status_code: '404'
   })
 }

}

// *******************Delete all Sub Admin or users *********************

exports.deleteAllUsers = async (req, res, next) =>{

 let decode = await getTokenDetail(req, res, next)
 let deleteUser = await User.deleteMany({ role : { $ne: "Super Admin" } })

  // delete subadmin and users permission 
  let deletePermission = await Permission.deleteMany({ userId : { $ne: decode.id }})

  if(deleteUser.n > 1 && deletePermission.n > 1) {
    res.status(200).json({
      status: 'success',
      message: 'All User Deleted successfully !',
      status_code: '200'
    })

  }else{
    // Delete All User and Sub Admin Avaibale
    res.status(200).json({
      status: 'success',
      message: 'All User ALready Deleted !',
      status_code: '200'
    })
  }
  
}





// *********************Test API **********************************
exports.getUser = (req, res, next) => {
    req.app.get('io').sockets.emit('login','It Hit app/user API***')
    let d= new Date().toUTCString()
    // let localDate=Date(d)
    // res.send('Hello From api get User******'+localDate.toLocaleString()+'*******'+d)

    res.send('hello from get user api ***'+getCurrentDateUTC()+'******'+d+'********local**********' +changeDateIntoLocale(getCurrentDateUTC()))
}



