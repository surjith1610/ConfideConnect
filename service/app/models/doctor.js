import mongoose from "mongoose";


const Schema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true        
    },
    name: {
        type: String,
        required: false        
    },
    phone : {
        type: String,
        required: false,
    },
    address: {
        street: { type: String, required: false },
        city: { type: String, required: false },
        state: { type: String, required: false },
        country: { type: String, required: false },
        zip: { type: String, required: false }
    },
    gender: {
        type: String,
        required: false
    },
    languagePreference: {
        type: String,
        required: false
    } ,   

    dob: {
        type: Date,
        required: false  
      },
      qualifications: {
        type: String,
        required: false
    } 
});


const model = mongoose.model('doctor', Schema);

export default model; 