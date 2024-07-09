import * as doctorService from '../services/doctor-service.js'
import { deleteDoctor } from '../services/doctor-service.js';
import { setResponse, setError } from './response-handler.js';

export const search = async (request, response) => {
  try {
    const params = { ...request.query };
    const doctorsList = await doctorService.search(params);
    setResponse(doctorsList, response);
  } catch (error) {
    setError(error, response);
  }
}

export const post = async (request, response) => {
  try {
    const doctorsData = { ...request.body };
    const doctors = await doctorService.save(doctorsData);
    setResponse(doctors, response);
  } catch (error) {
    console.error("Error in post function:", error);
    setError(error, response);
  }
}

export const get = async (request, response) => {
  try {
    const doctorsData = await doctorService.get(request.params.doctorId);
    setResponse(doctorsData, response);
  } catch (error) {
    setError(error, response);
  }
}

export const del = async (request, response) => {
  try {
    const deletedDoctor = await doctorService.deleteDoctor(request.params.doctorId);
    setResponse(deletedDoctor, response);
  } catch (error) {
    setError(error, response);
  }
}

export const put = async (request, response) => {
  try {
    const id = request.params.id;
    const doctors = { doctorId: id, ...request.body };
    const doctorRegistration = await doctorService.update(doctors);
    setResponse(doctorRegistration, response);
  } catch (error) {
    console.error("Error in put function:", error);
    setError(error, response);
  }
}

export const filterDoctors = async (req, res) => {
  const { keyword } = req.query;
  
  try {
    const filteredDoctors = await doctorService.filterDoctors(keyword);
    setResponse(filteredDoctors, res);
  } catch (error) {
    console.error("Error in filter function:", error);
    setError(error, res);
  }
};

export const deleteAllDoctors = async (request, response) => {
  try {
    const doctors = await doctorService.deleteAllDoctors();
    setResponse(doctors, response);
  } catch (error) {
    setError(error, response);
  }
};
