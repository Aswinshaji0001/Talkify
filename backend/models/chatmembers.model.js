import mongoose, { mongo } from "mongoose";

const memberSchema=new mongoose.Schema({
    senderId:{type:String},
    recieverId:{type:String}
});
export default mongoose.model.members||mongoose.model("member",memberSchema);