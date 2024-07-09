import Patient from './../models/patient.js';

/**
 * Retrieves all patient objects based on search parameters.
 * @param {Object} params Query parameters for MongoDB search.
 * @returns {Promise<Array>} A promise that resolves to an array of patient objects.
 */
export const getAll = async () => {
        const patients = await Patient.find();
        return patients;
}
export const deleteAll = async () => {
        const patients = await Patient.deleteMany();
        return patients;
}

/**
 * Saves a new patient object to the database.
 * @param {Object} patient The patient data to create a new document.
 * @returns {Promise<Object>} A promise that resolves to the newly created patient document.
 */
export const createPatient = async (patient) => {
        const newPatient = new Patient(patient);
        const savedPatient = await newPatient.save();
        return savedPatient;
};

/**
 * Updates a single patient object based on its ID.
 * @param {String} patientId - The ID of the patient to update.
 * @param {Object} updatedPatientData - The data to update in the patient's document.
 * @returns {Promise<Object>} A promise that resolves to the updated patient document, or null if no document was found.
 */
export const updatePatient = async (patientId, updatedPatientData) => {
        const updatedPatient = await Patient.updateOne(
            { patientId: patientId },
            updatedPatientData,
            { new: true }
        );
        return updatedPatient;
};

/**
 * Deletes a patient from the database by their ID.
 * @param {String} patientId The ID of the patient to delete.
 * @returns {Promise<Object>} A promise that resolves to the result of the deletion operation.
 */
export const deletePatient = async (patientId) => {
        const result = await Patient.deleteOne({patientId:patientId});
        return result;
};

/**
 * Retrieves a single patient object by ID.
 * @param {String} patientId The unique identifier for the patient.
 * @returns {Promise<Object>} A promise that resolves to a patient object, or null if not found.
 */
export const getById = async (patientId) => {
        const patient = await Patient.findOne({patientId: patientId}).exec();
        return patient;
}
