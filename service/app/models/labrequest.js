import mongoose from "mongoose";


const Schema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    labId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lab',
        required: true
    },
    requestName: {
        type: String,
        required: true
    },
    requestDescription: {
        type: String,
        required: true
    },
    labReport: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['REQUESTED', 'MATCHED', 'KITSENT', 'KITDELIVERED','SAMPLESENT','SAMPLEDELIVERED','ANALYSISINPROGRESS','REPORTPUBLISHED'],
        default: 'REQUESTED',
        required: true
    } ,   
    notificationEmail: {
        type: String,
        required: true
    },
    notificationPhone: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now // Default value set to the current date and time when the document is created
      },
      modifiedTime: {
        type: Date,
        required: true
    },
    preExistingConditions: {
        type: [String],
        required: true
    },
    patientAddress: {
        street: { type: String, required: false },
        city: { type: String, required: false },
        state: { type: String, required: false },
        country: { type: String, required: false },
        zip: { type: String, required: false }
    }
});


const model = mongoose.model('labRequest', Schema);

export default model; 