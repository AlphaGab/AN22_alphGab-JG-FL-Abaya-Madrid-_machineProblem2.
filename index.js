const express = require("express");
const mongoose = require("mongoose")
const loginRoute = require("./routes/loginRoute")
const productRoute = require("./routes/productsRoute")
const app = express();
const port = 4000


app.use(express.json())
mongoose.connect(
    "mongodb+srv://gabriel_202110419:ilovemongodb08@sandbox.glievxm.mongodb.net/Ecommerce?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

app.use("/login",loginRoute)
app.use("/products",productRoute)

app.get("/",async(req,res)=>{
  res.send("Hello")
})

mongoose.connection.once('open',()=>console.log("Now Connected to MongoDb Atlas"))
app.listen(port,()=>{
    console.log("App is running at port " + port)
})