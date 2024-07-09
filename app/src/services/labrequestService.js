import axios from "axios";


const baseURL = "http://localhost:3002/confideconnect/labrequests";

// get LabRequest by patientId
const getLabRequestsForPatient = async (patientId) => {
  const response = await axios.get(baseURL+`/filter?patientId=${patientId}`);
  return response.data;
}

// get LabRequest by labId
const getLabRequestsForLab = async (labId) => {
  const response = await axios.get(baseURL+`/filter?labId=${labId}`);
  return response.data;
}

// create LabRequest
const createLabRequest= async (requestInfo) => {
  const response = await axios.post(baseURL, requestInfo);
  return response.data;
}

// delete LabRequest by id
const deleteLabRequest = async (labRequestId) => {
  const response = await axios.delete(baseURL+`/${labRequestId}`);
  return response.data;
}

const updateLabRequest = async (labRequestId, requestInfo) => {
  const response = await axios.put(baseURL+`/${labRequestId}`, requestInfo);
  return response.data;
}

// Fetch all labrequests
const AdminGetLabRequests = async () => {
    const response = await axios.get(baseURL);
    return response.data;
}

// Update labrequest
const AdminUpdateLabRequest = async (labrequest) => {
    const response = await axios.put(`${baseURL}/${labrequest._id}`, labrequest);
    return response.data;
}

// Delete labrequest
const AdminDeleteLabRequest = async (id) => {
    const response = await axios.delete(`${baseURL}/${id}`);
    return response.data;
}

// Create labrequest
const AdminCreateLabRequest = async (newLabRequest) => {
    const response = await axios.post(baseURL, newLabRequest);
    return response.data;
}

// Labrequest service object
const labRequestService = { getLabRequestsForPatient,getLabRequestsForLab, createLabRequest,deleteLabRequest,
  updateLabRequest, AdminCreateLabRequest, AdminDeleteLabRequest, AdminGetLabRequests, AdminUpdateLabRequest};

export default labRequestService;
