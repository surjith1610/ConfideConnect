import * as donationService from '../services/donation-services.js'
import mongoose from 'mongoose';
import { setError, setResponse } from './response-handler.js';
import { request } from 'express';

export const getAllDonations = async (request, response) => {
    try{
        const allDonations = await donationService.getAllDonations();
        setResponse(allDonations,response);
    }
    catch (error){
        setError(error,response)
    }
}

export const createDonation = async (request, response) => {
    try{
        const createParams = {...request.body};
        const addDonation = await donationService.createDonation(createParams);
        setResponse(addDonation,response)
    }
    catch(error){
        setError(error,response)
    }
}


export const filterDonation = async (request,response) =>{
    const{donationId} = request.query;
    try{
        const filteredDonations = await donationService.filterDonation(donationId);
        setResponse(filteredDonations,response)
    }
    catch(error){
        setError(error,response)
    }
}

export const updateDonation = async (request, response) => {
    const { id } = request.params;
    const updatedDonationData = { ...request.body };
    try {
        const updatedDonation = await donationService.updateDonation(id, updatedDonationData);
        setResponse(updatedDonation, response);
    } catch (error) {
        setError(error, response);
    }
}


export const deleteDonation = async (request,response) =>{
    const {id} = request.params;
    try{
        const deletedDonation = await donationService.deleteDonation(id);
        setResponse(deletedDonation, response);
    }
    catch(error){
        setError(error,response)
    }
};

export const deleteAllDonations = async (request, response) => {
    try {
        const donations = await donationService.deleteAllDonations();
        setResponse(donations, response); 
    } catch (error) {
        setError(error, response);
    }
};
