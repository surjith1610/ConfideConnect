import MedicalRequest from '../models/medicalrequest.js';

/**
 * Retrieves all medicalrequest objects based on search parameters.
 * @param {Object} params Query parameters for MongoDB search.
 * @returns {Promise<Array>} A promise that resolves to an array of medicalrequest objects.
 */
export const getAll = async () => {
        const medicalrequests = await MedicalRequest.find();
        return medicalrequests;
}

export const deleteAll = async () => {
        const medicalrequests = await MedicalRequest.deleteMany();
        return medicalrequests;
}

/**
 * Saves a new medicalrequest object to the database.
 * @param {Object} medicalrequest The medicalrequest data to create a new document.
 * @returns {Promise<Object>} A promise that resolves to the newly created medicalrequest document.
 */
export const createMedicalRequest = async (medicalrequest) => {
        const newMedicalRequest= new MedicalRequest(medicalrequest);
        const savedMedicalRequest = await newMedicalRequest.save();
        return savedMedicalRequest;
};

/**
 * Updates a single medicalrequest object based on its ID.
 * @param {String} requestId - The ID of the request to update.
 * @param {Object} updatedMedicalRequestData - The data to update in the medical request document.
 * @returns {Promise<Object>} A promise that resolves to the updated medical request document, or null if no document was found.
 */
export const updateMedicalRequest = async (requestId, updatedMedicalRequestData) => {
        const updatedMedicalRequest = await MedicalRequest.updateOne(
            { _id: requestId },
            updatedMedicalRequestData,
            { new: true }
        );
        return updatedMedicalRequest;
};

/**
 * Deletes a medicalrequest from the database by their ID.
 * @param {String} requestId The ID of the medicalrequest to delete.
 * @returns {Promise<Object>} A promise that resolves to the result of the deletion operation.
 */
export const deleteMedicalRequest = async (requestId) => {
        const result = await MedicalRequest.deleteOne({_id:requestId});
        return result;
};

/**
 * Retrieves a single medicalrequest object by ID.
 * @param {String} requestId The unique identifier for the medicalrequest.
 * @returns {Promise<Object>} A promise that resolves to a medicalrequest object, or null if not found.
 */
export const getById = async (requestId) => {
        const medicalRequest = await MedicalRequest.findOne({_id: requestId}).exec();
        return medicalRequest;
}


/**
 * Filters medical requests based on patient ID and doctor ID.
 * This function retrieves all medical request records that match the given patient and doctor IDs.
 * @param {String} patientId - The patient's ID to filter by.
 * @param {String} doctorId - The doctor's ID to filter by.
 * @returns {Promise<Array>} A promise that resolves to an array of medical request objects that match the criteria.
 */
export const filter = async (patientId, doctorId) => {
    try {
        // Construct the query object
        const query = {};
        if (patientId) query.patientId = patientId;
        if (doctorId) query.doctorId = doctorId;

        // Execute the query using the find method
        const medicalRequests = await MedicalRequest.find(query).exec();
        return medicalRequests;
    } catch (error) {
        console.error("Failed to filter medical requests:", error);
        throw new Error('Error filtering medical requests', { cause: error });
    }
};