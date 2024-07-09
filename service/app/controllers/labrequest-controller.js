import * as labRequestService from '../services/labrequest-service.js'
import { setResponse, setError } from './response-handler.js';

export const search = async (request, response) => {
  try {
    const params = { ...request.query };
    const labRequestList = await labRequestService.search(params);
    setResponse(labRequestList, response);
  } catch (error) {
    setError(error, response);
  }
}

export const post = async (request, response) => {
  try {
    const labRequestData = { ...request.body };
    const labRequests = await labRequestService.save(labRequestData);
    setResponse(labRequests, response);
  } catch (error) {
    console.error("Error in post function:", error);
    setError(error, response);
  }
}

export const get = async (request, response) => {
  try {
    const labRequestData = await labRequestService.get(request.params.requestId);
    setResponse(labRequestData, response);
  } catch (error) {
    setError(error, response);
  }
}

export const del = async (request, response) => {
  try {
    const deletedLabRequest = await labRequestService.deleteLabRequest(request.params.requestId);
    setResponse(deletedLabRequest, response);
  } catch (error) {
    setError(error, response);
  }
}

export const put = async (request, response) => {
  try {
    const updatedLabRequest = {...request.body};
    const  requestId  = request.params.requestId;
    const updateLabRequest =  await labRequestService.update(requestId, updatedLabRequest);
    setResponse(updateLabRequest, response);
  } catch (error) {
    console.error("Error in put function:", error);
    setError(error, response);
  }
}

export const deleteAllLabReq = async (request, response) => {
  try {
    const labRequests = await labRequestService.deleteAllLabReq();
    setResponse(labRequests, response)
  } catch (error) {
    setError(error, response);
  }
};

export const filterLabRequest =  async (request, response ) => {
  try {
    const patientId = request.query.patientId;
    const labId = request.query.labId;

    const filteredLabRequests = await labRequestService.filter(patientId,labId);

    setResponse(filteredLabRequests,response);
  }
  catch (error){
    console.log(error);
    setError(error, response);
  }
}
