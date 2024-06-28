import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  phoneNum: {
    type: Number,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  referralCode: { 
    type: String, 
    unique: true 
},
});

// userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);
export default User;
