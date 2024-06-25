import mongoose from "mongoose" 

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true, unique:true },
    desc: {type:string, required: true,    },
     img: { type: string, required: true },
     categories: { type: Array, required: true , unique: true },
     size : {type: string},
     color: {type: string},
     price: {type:Number, required: true},

},
{timestamps: true }
);

export default ProductSchema;