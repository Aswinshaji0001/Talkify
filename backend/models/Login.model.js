import mongoose, { mongo } from "mongoose";

const loginSchema=new mongoose.Schema({
    username:{type:String},
    password:{type:String},
    email:{type:String},
    profile:{type:String}
});
export default mongoose.model.login||mongoose.model("login",loginSchema);