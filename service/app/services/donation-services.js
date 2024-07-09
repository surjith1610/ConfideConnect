// services for Donations which defines CRUD operations
import Donation from "../models/donation.js";

export const getAllDonations = async () => {
    return await Donation.find();
};

export const createDonation = async (donationData) => {
    const newDonation = new Donation(donationData); 
    const savedDonation = await newDonation.save();  
    return savedDonation;  
};

export const filterDonation = async (donationId) => {
    let filter = {};

    if (donationId) {
        filter._id = donationId; 
    }
    return await Donation.find(filter);
};

export const updateDonation = async(id,donationUpdate) => {
    return await Donation.updateOne({_id:id}, donationUpdate, { new: true });
};

export const deleteDonation = async(id) => {
    return await Donation.deleteOne({_id:id});
};

export const deleteAllDonations = async () => {
    return await Donation.deleteMany();
};