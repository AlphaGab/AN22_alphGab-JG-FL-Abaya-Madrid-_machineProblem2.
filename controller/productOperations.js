const productModel = require("../model/product")


const addProduct = async(req,res)=>{
    const {Name,Description,Price,isActive} = req.body
    try{
    await productModel.create({Name:Name,Description:Description,Price:Price,isActive:isActive})
    res.send("Product Succesfully Added")
    }catch(error){
        res.send(error)
    }

}
const showSingleProduct = async(req,res)=>{
    console.log("here at single product")
    try{
        const productIdQuery = req.params.productId
        const singleProduct =  await productModel.find({
            $and: [{ isActive: true }, { _id: productIdQuery }]
          })
          if (singleProduct.length === 0) {
            return res.status(404).json({ message: "Product not found" });
          }
          
          // Handle the case when a valid product is found
          res.json(singleProduct);
          

    }catch(error){
        res.send(Error)
    }
}




const showAllActiveProducts = async(req,res)=>{
    try{
        const allProducts = await productModel.find({isActive:true})
        res.send(allProducts)
    }catch(error){
        res.send(error)
    }
}
const updateProduct = async(req,res)=>{
    try{
        const{Name,Description,Price,isActive} = req.body
        const productTobePlaced = ({Name:Name,Description:Description,Price:Price,isActive:isActive})
        const productId = req.params.productId
        const filter = { _id: productId };
        const updatedProduct = await productModel.findOneAndUpdate(filter, productTobePlaced, { new: true })
        if(!updatedProduct){
            return res.status(404).json({ message: "Product not found" })
        }
        res.json(updatedProduct)
    }catch(error){
        res.send(error)
    }
}
const toArchive = async(req,res)=>{
    try{
        const productId = req.params.productId
        const filter = { _id: productId };
        const updatedProduct = await productModel.findOneAndUpdate(filter, {isActive:false}, { new: true })
        if(!updatedProduct){
            return res.status(404).json({ message: "Product not found" })
        }
        res.json(updatedProduct)
    }catch(error){
        res.send(error)
    }
}

module.exports = {addProduct,showAllActiveProducts,showSingleProduct,updateProduct,toArchive}
