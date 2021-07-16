const mongoose = require('mongoose')

const permissionSchema = new mongoose.Schema({
   userId: mongoose.Schema.Types.ObjectId,
   isBlockUser: Boolean,
   isDeleteUser: Boolean,
   isVideoCall: Boolean,
   isBookmark: Boolean,
   isAudioCall: Boolean,
   isStatusView: Boolean,
   isSetting: Boolean

   // isCreateAdmin: Boolean,
   // isRemoveAdmin: Boolean,
   // isDeleteAdmin: Boolean,
   // isCreateUser: Boolean,
   // isDeleteUser: Boolean,
   // isRemoveUser: Boolean,
   // isCreateRoom: Boolean,
   // isCreatePersonalChatRoom: Boolean

})
module.exports = permissionSchema