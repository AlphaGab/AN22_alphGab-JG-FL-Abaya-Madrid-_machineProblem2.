const bcrypt = require('bcrypt');
const user = require("../model/userModel")
const registerAccount = async(req,res)=>{

try{
    const{Email,Password,isAdmin} = req.body
    const hashpassword = await bcrypt.hash(Password,10)
    await user.create({Email:Email,Password:hashpassword,isAdmin:isAdmin})
    res.status(200).json({ message: 'Account registered successfully!' });

}catch(error){
    res.send(error)
}
}

async function checkEmail(req,res,next) {
    try {
        const{Email,Password,isAdmin}= req.body
      const userEmail = await user.findOne({ Email: Email });
      console.log(userEmail)
     if(userEmail){
        res.send("Email Exists")
     }
     else {
        next()
     }
    } catch (error) {
    console.log("Hello")
      console.error(error);
    }
  }
module.exports = {checkEmail,registerAccount}