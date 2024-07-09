import axios from "axios";

const baseURL = "http://localhost:3002/confideconnect/patients";

// Fetch all patients
const AdminGetPatients = async () => {
    const response = await axios.get(baseURL);
    return response.data;
}

// Update patient
const updatePatient = async (id,patient) => {
    const response = await axios.put(`${baseURL}/${id}`, patient);
    return response.data;}
    
const AdminUpdatePatient = async (patient) => {
    const response = await axios.put(`${baseURL}/${patient.patientId}`, patient);
    return response.data;
}

const getPatientById = async (patientId) => {
    const response = await axios.get(`${baseURL}/${patientId}`);
    return response.data;

}

// Patient service object
const patientService = {  updatePatient, getPatientById, AdminGetPatients, AdminUpdatePatient};

export default patientService;
