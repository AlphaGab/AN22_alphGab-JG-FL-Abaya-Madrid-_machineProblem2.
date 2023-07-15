/*
userId (ObjectId)
o Must be associated with user who owns the order
o products (Array of Objects)
o productId (ObjectId)
o quantity (Number)
o totalAmount (Number)
o purchasedOn (Date - defaults to current timestamp)

*/


const mongoose = require("mongoose")
const orderSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    purchasedOn: {
      type: Date,
      default: Date.now,
    },
  });
  