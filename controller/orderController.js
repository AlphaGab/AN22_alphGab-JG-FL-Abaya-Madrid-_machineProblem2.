const orderModel = require("../model/orderModel")
const productModel = require("../model/product");
const userModel = require("../model/userModel")
const { CastError } = require('mongoose');

const checkout = async (req, res) => {
    const products = req.body.products;
    let successfull = []
    let unsuccessfull = []
    for (const product of products) {
      const { productId, quantity } = product;
  
      try {
        const isAvailable = await productModel.findOne({ _id: productId,isActive:true });
        if (isAvailable) {
          await orderModel.create({
            userId: req.user,
            products: [{ productId, quantity }],
            totalAmount: isAvailable.Price * quantity

          });
          successfull.push(productId)
        }
        else unsuccessfull.push(productId)

      } catch (error) {
        if (error instanceof CastError) {
          console.log("Invalid productId:", productId);
        } else {
          console.error("Error:", error);
        }
      }
    }
  
    res.json({successfull:successfull,unsuccessfull:unsuccessfull});
  };

  const getUserDetails = async(req,res)=>{
    
    const userId = req.params.userId
    if(req.user !== userId){
        return res.status(403).json({ success: false, message: "Access denied" });
    }
    try {
       const user = await userModel.find({_id:userId})
        
        if(!user){
            return res.status(404).json({ success: false, message: "User not found" });
        }
        user[0].Password = "";

        res.json({ user });
    }catch(error){
        res.json(error)
    }
  }
  const getAllOrders = async(req,res)=>{
    try{
        res.send(await orderModel.find())
    }
    catch(error){
        res.json(error)
    }
  }
  const showUserOrder = async(req,res)=>{
    try{
        const data = await orderModel.find({userId:req.user})
        if(data)res.send(data)
        else res.status(404).json({message:"Not Found"})
    }
    catch(error){
        res.json(error)
    }
  }
  const makeAdmin = async(req,res)=>{
    try{
        const userId = req.params.userId
        const user = await userModel.findByIdAndUpdate(userId,{isAdmin:true},{new:true})
        if(user) res.send(user) 
        else res.status(404).json({message:"Not Found"})
    }
    catch(error){
        res.json(error)
    }
    
  }
  
module.exports = {checkout,getUserDetails,getAllOrders,showUserOrder,makeAdmin}

