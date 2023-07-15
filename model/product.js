/*o Name (String)
o Description (String)
o Price (Number)
o isActive (Boolean - defaults to true)
o createdOn (Date - defaults to current timestamp
*/

const mongoose = require("mongoose")
const productSchema = new mongoose.Schema(
    {
      Name: {
        type: String,
        required: true,
      },
      Description: {
        type: String,
        required: true,
      },
      Price: {
        type: Number,
        required: true,
      },
      isActive: {
        type: Boolean,
        required: true,
      },
      createdOn: {
        type: Date,
        required: true,
      },
    }
  );

const product = mongoose.model('products',productSchema)

module.exports = product