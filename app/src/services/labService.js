import axios from "axios";


const baseURL = "http://localhost:3002/confideconnect/labs";

// get Lab by id
const getLab = async (labId) => {
  const response = await axios.get(baseURL+`/${labId}`);
  return response.data;
}

const updateLab = async (labId, lab) => {
  const response = await axios.put(baseURL+`/${labId}`, lab);
  return response.data;

}

// Fetch all labs
const getLabs = async () => {
  const response = await axios.get(baseURL);
  return response.data;
}

const AdminGetLabs = async () => {
    const response = await axios.get(baseURL);
    return response.data;
}

// Update lab
const AdminUpdateLab= async (lab) => {
    const response = await axios.put(`${baseURL}/${lab.labId}`, lab);
    return response.data;
}

// Lab service object
const labService = { getLab, updateLab, getLabs, AdminGetLabs, AdminUpdateLab };

export default labService;
