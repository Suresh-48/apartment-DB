import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Phone Number is Required"],
    },
    residentType: {
      type: String,
      required: [true, "Resident Type is Required"],
    },
    blockName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Block",
    },
    flatNumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flat",
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
    },
    password: {
      type: String,
    },
    otp:{
       type: Number, 
    },
    role: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    sessionToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const user = model("User", userSchema);

export default user;
