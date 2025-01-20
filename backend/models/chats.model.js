import mongoose, { mongo } from "mongoose";

const chatSchema=new mongoose.Schema({
    senderId:{type:String},
    recieverId:{type:String},
    message:{type:String},
    date:{type:String},
    time:{type:String},
    seen:{type:Boolean}
});
export default mongoose.model.chats||mongoose.model("chats",chatSchema);