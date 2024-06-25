import mongoose from "mongoose" 

const OrderSchema = new mongoose.Schema({
      userId: { type: String, required: true, unique:true },
    products: [
        { 
            productId:{
               type: String,
               default: 1, 
            },
            quantity:{
                type: Number,
                default: 1,
            },
            
        },
    ],
     amount: { type: Number, required: true},
     adresse: { type:Object, required:true },
     status : { type:String, default: "pending"},

},
{timestamps: true }
);

export default  OrderSchema;