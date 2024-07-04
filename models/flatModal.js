import { timeStamp } from "console";
import mongoose from "mongoose";
const {Schema, model } = mongoose;

const apartmentFlatSchema = new Schema ({
flatId:{
    type: String,
    required:[true, "Flat Id is Required"]
},
blockId:{
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Block Id is Required"],
    ref: "Block"
},
flatName:{
    type: String,
    required: [true, "Block Name is Required"]
},
isActive:{
    type: Boolean,
},
createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
},
createdAt:{
    type: Date,
},
updatedAt: {
    type: Date,
},
deletedAt:{
    type: Date,
},
timeStamp: true,
});

apartmentFlatSchema.method("toJSON", function () {
    const {__v,_id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Flat = model("Flat", apartmentFlatSchema);
export default Flat;