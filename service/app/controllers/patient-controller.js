// Controller for parsing the incoming data and passing it to the respective functions
import * as patientService from './../services/patient-service.js';
import {setResponse, setError} from './response-handler.js';

// Extracting data from request using parameters
export const getAll = async (request, response) => {
    try{
        const patients = await patientService.getAll();
        setResponse(patients, response);
    }
    catch(error){
        setError(error, response);
    }
}

export const getById = async (request, response) => {
    try {
        const patientId = request.params.patientId;
        const patient = await patientService.getById(patientId);
        setResponse(patient, response);
    }
    catch(error){
        setError(error, response);
    }
}

export const createPatient =  async ( request, response) => {
    try{
        const patient = {...request.body};
        const addPatient = await patientService.createPatient(patient);
        setResponse(addPatient, response);
    }
    catch(error){
        setError(error, response);
    }
}

export const updatePatient = async (request, response) => {
    try{        
        // Extracting the updated patient data from request parameters
        const updatedPatient = {...request.body};
        const  patientId  = request.params.patientId;
        const updatePatient = await patientService.updatePatient(patientId, updatedPatient);
        setResponse(updatePatient, response);
    }
    catch(error){
        setError(error, response);
    }
}

export const deletePatient = async (request, response) => {
    try{
        // Extracting the patientId from the request parameters
        const  patientId  = request.params.patientId;
        const deletedPatient = await patientService.deletePatient(patientId);
        setResponse(deletedPatient, response);
    }
    catch(error){
        setError(error, response);
    }
}

export const deleteAllPatients = async (request, response) => {
    try{
        const patients = await patientService.deleteAll();
        setResponse(patients, response);
    }
    catch(error){
        setError(error, response);
    }
}