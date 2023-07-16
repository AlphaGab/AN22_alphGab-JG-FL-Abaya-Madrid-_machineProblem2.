const productModel = require("../model/product")
const jwt = require('jsonwebtoken');


const addProduct = async(req,res)=>{
    const {Name,Description,Price,isActive} = req.body
    try{
    await productModel.create({Name:Name,Description:Description,Price:Price,isActive:isActive})
    res.send("Product Succesfully Added")
    }catch(error){
        res.send(error)
    }

}
module.exports = {addProduct}
