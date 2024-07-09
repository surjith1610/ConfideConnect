import axios from 'axios';

const BASE_URL = 'http://localhost:3002/confideconnect';
const baseURL = 'http://localhost:3002/confideconnect/donations';


// Fetch all donations
const AdminGetDonations = async () => {
    const response = await axios.get(baseURL);
    return response.data;
}

// Update donation
const AdminUpdateDonation = async (donation) => {
    const response = await axios.put(`${baseURL}/${donation._id}`, donation);
    return response.data;
}

// Delete donation
const AdminDeleteDonation = async (id) => {
    const response = await axios.delete(`${baseURL}/${id}`);
    return response.data;
}

// Donation service object
const donationService = {
    makeDonation: async (data) => {
        try {
            const response = await axios.post(`${BASE_URL}/donations`, data);
            return response.data;
        } catch (error) {
            console.error('Error making donation:', error);
            throw error; // Re-throw the error to handle it in the component
        }
    }, AdminDeleteDonation, AdminGetDonations, AdminUpdateDonation
};


export default donationService;