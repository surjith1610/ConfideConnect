import mongoose from "mongoose";

const { Schema } = mongoose;


const eventModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    createdDate: { type: Date, default: Date.now },
    address:{
        type:{
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
        },
        required: true
    },
    creatorId: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
});

const EventModel = mongoose.model('Event', eventModel);

export default EventModel;