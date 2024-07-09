import mongoose from "mongoose";

const { Schema } = mongoose;

const PatientSchema = new Schema({
    patientId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    name: { 
        type: String, 
        required: false 
    },
    phone: { 
        type: String, 
        required: false 
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
    },
    dob: { 
        type: Date, 
        required: false 
    }
});

const PatientModel = mongoose.model('Patient', PatientSchema);

export default PatientModel;
