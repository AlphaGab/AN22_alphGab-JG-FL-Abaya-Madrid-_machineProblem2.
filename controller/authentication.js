
const bcrypt = require('bcrypt');
const userModel = require("../model/userModel")
const jwt = require('jsonwebtoken');
const authenticateLogin = async(req,res)=>{
const { Email, Password } = req.body;

try {
  // Find user by email
  const user = await userModel.findOne({ Email:Email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  console.log("here")

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(Password, user.Password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid email or password' });
    
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, 'secret_key');

  // Send token as response
  res.json({ token });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Error logging in' });
}
}

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, 'secret_key');
      req.user = decoded.userId; 
      next()
    } catch (error) {
      return res.status(403).json({ message: 'Invalid token' });
    }
  };
  const isAdmin = async(req,res,next)=>{
    try {
      const userId= req.user
      const data = await userModel.findOne({ _id: userId });
      console.log(userId)
      if(data.isAdmin == true){
        console.log("Here at true")
        next()
      }
      else
        res.send("Admin Access Only")  
    } catch (error) {
    console.log("Error")
    }
  }
  module.exports ={isAdmin,authenticateLogin,authenticateToken}