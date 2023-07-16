const express = require("express");
const mongoose = require("mongoose")
const loginRoute = require("./routes/loginRoute")
const productRoute = require("./routes/productsRoute")
const userOrderRoute = require("./routes/usersOrder")
const app = express();
const port = 4000
// AN22 source code Template for 2T AY 2022-2023
/*
	Program:	Computation of Grades using Function
	Programmer:	ABAYA, Jose Gabriel D.
              MADRID, Francis Ludwick T.
	Section:	AN22
	Start Date:	July 15, 2023
	End Date:	July 17, 2023
*/
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
app.use("/users",userOrderRoute)
app.get("/",async(req,res)=>{
  res.send("Hello")
})

mongoose.connection.once('open',()=>console.log("Now Connected to MongoDb Atlas"))
app.listen(port,()=>{
    console.log("App is running at port " + port)
})