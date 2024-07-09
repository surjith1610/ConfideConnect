import mongoose from "mongoose";

const { Schema } = mongoose;


const chatMessageSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    message: { type: String, required: true },
    username: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

export default ChatMessage;