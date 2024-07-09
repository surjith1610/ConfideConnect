import mongoose from "mongoose";

const { Schema } = mongoose;


const blogModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdDate: { type: Date, default: Date.now },
    creatorId: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
});

const Blogmodel = mongoose.model('Blog', blogModel);

export default Blogmodel;