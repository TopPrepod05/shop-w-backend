import mongoose from "mongoose"

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: Number,
    image: String,
    description: String,
})

const Product = mongoose.model('Product', productSchema)

export default Product