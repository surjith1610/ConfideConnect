import mongoose from "mongoose";

const { Schema } = mongoose;

const MedicalRequestSchema = new Schema({
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
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
    doctorPrescription: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['REQUESTED', 'MATCHED', 'INPROGRESS', 'COMPLETED'],
        default: 'REQUESTED',
        required: true
    },
    notificationEmail: {
        type: String,
        required: false
    },
    notificationPhone: {
        type: String,
        required: false
    },
    creationTime: {
        type: Date,
        default: Date.now,
        required: true
    },
    modifiedTime: {
        type: Date,
        default: Date.now,
        required: true
    },
    preExistingConditions: {
        type: [String],
        required: false
    }
});

const MedicalRequestModel = mongoose.model('MedicalRequest', MedicalRequestSchema);

export default MedicalRequestModel;
