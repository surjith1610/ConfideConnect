import * as labService from '../services/lab-service.js'
import { setResponse, setError } from './response-handler.js';

export const search = async (request, response) => {
  try {
    const params = { ...request.query };
    const labsList = await labService.search(params);
    setResponse(labsList, response);
  } catch (error) {
    setError(error, response);
  }
}

export const post = async (request, response) => {
  try {
    const labsData = { ...request.body };
    const labs = await labService.save(labsData);
    setResponse(labs, response);
  } catch (error) {
    console.error("Error in post function:", error);
    setError(error, response);
  }
}

export const get = async (request, response) => {
  try {
    const labsData = await labService.get(request.params.labId);
    setResponse(labsData, response);
  } catch (error) {
    setError(error, response);
  }
}

export const del = async (request, response) => {
  try {
    const deletedLab = await labService.deleteLab(request.params.labId);
    setResponse(deletedLab, response);
  } catch (error) {
    setError(error, response);
  }
}

export const put = async (request, response) => {
  try {
    const id = request.params.id;
    const labs = { labId: id, ...request.body };
    const labRegistration = await labService.update(labs);
    setResponse(labRegistration, response);
  } catch (error) {
    console.error("Error in put function:", error);
    setError(error, response);
  }
}

export const filterLabs = async (req, res) => {
  const { keyword} = req.query;
  
  try {
    const filteredLabs = await labService.filterLabs(keyword);
    setResponse(filteredLabs, res);
  } catch (error) {
    console.error("Error in filter function:", error);
    setError(error, res);
  }
};

export const deleteAllLab = async (request, response) => {
  try {
      const labs = await labService.deleteAllLab();
      setResponse(labs, response);
  } catch (error) {
      setError(error, response);
  }
};
