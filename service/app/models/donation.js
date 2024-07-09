import mongoose from "mongoose";

const donationModel = new mongoose.Schema({
    name: String,
    amount: {
        type: String,
        required: true
    },
    createdDate: { 
        type: Date, 
        default: Date.now 
    },
    status: {
        type: String,
        enum: ['fail', 'success']
    }
});

const DonationModel = mongoose.model('Donation', donationModel);

export default DonationModel;