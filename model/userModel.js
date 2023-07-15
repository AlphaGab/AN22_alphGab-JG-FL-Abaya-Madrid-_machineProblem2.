/* Email (String)
 Password (String)
 isAdmin (Boolean - defaults to false)
*/
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    Email: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
  });
  
const user = mongoose.model('users',userSchema)
module.exports= user

