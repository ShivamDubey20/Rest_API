const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name:{
            type: String ,
            required : [true, "Please enter a product name"]
        },
        quantity: {
            type: Number,
            default: 0
        },
        price:{
            type: Number,
            required: true
        },
        Image:{
            type: String,
            required : false
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product',productSchema);

module.exports = Product;