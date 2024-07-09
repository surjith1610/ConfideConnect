// Controller for parsing the incoming data and passing it to the respective functions
import * as medicalRequestService from './../services/medicalrequest-service.js';
import {setResponse, setError} from './response-handler.js';

// Extracting data from request using parameters
export const getAll = async (request, response) => {
    try{
        const medicalrequests = await medicalRequestService.getAll();
        setResponse(medicalrequests, response);
    }
    catch(error){
        setError(error, response);
    }
}

export const getByID = async (request, response) => {
    try {
        const requestId = request.params.requestId;
        const medicalRequest = await medicalRequestService.getById(requestId);
        setResponse(medicalRequest, response);
    }
    catch(error){
        setError(error, response);
    }
}

export const createMedicalRequest =  async ( request, response) => {
    try{
        const medicalRequest = {...request.body};
        const addMedicalRequest= await medicalRequestService.createMedicalRequest(medicalRequest);
        setResponse(addMedicalRequest, response);
    }
    catch(error){
        setError(error, response);
    }
}

export const updateMedicalRequest = async (request, response) => {
    try{        
        // Extracting the updated medical request data from request parameters
        const updatedMedicalRequest = {...request.body};
        const  requestId  = request.params.requestId;
        const updateMedicalRequest = await medicalRequestService.updateMedicalRequest(requestId, updatedMedicalRequest);
        setResponse(updateMedicalRequest, response);
    }
    catch(error){
        setError(error, response);
    }
}

export const deleteMedicalRequest = async (request, response) => {
    try{
        // Extracting the medical requestId from the request parameters
        const  requestId  = request.params.requestId;
        const deletedRequest = await medicalRequestService.deleteMedicalRequest(requestId);
        setResponse(deletedRequest, response);
    }
    catch(error){
        setError(error, response);
    }
}

export const filterMedicalRequest =  async (request, response ) => {
    try {
     const patientId = request.query.patientId;
     const doctorId = request.query.doctorId;
 
     // Filter medical requests based on provided parameters
     const filteredMedicalRequests = await medicalRequestService.filter(patientId,doctorId);
 
     // Send the filtered medical requests as response
     setResponse(filteredMedicalRequests,response);
    }
    catch (error){
     setError(error, response);
 }
 }

 export const deleteAllmedicalRequests = async (request, response) => {
    try{
        const medicalrequests = await medicalRequestService.deleteAll();
        setResponse(medicalrequests, response);
    }
    catch(error){
        setError(error, response);
    }
}