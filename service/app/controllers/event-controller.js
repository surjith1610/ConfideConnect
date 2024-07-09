import * as eventService from '../services/event-services.js'
import mongoose from 'mongoose';
import { setError, setResponse } from './response-handler.js';

export const getAllEvents = async (request,response) =>{
    try{
        const getParams = {...request.filter}
        const allevents = await eventService.getAllEvents();
        setResponse(allevents,response);
    }
    catch(error){
        setError(error,response);
    }

}

export const createEvent = async (request, response) => {
    try{
        const createParams = {...request.body};
        const addEvent = await eventService.createEvent(createParams);
        setResponse(addEvent,response)
    }
    catch(error){
        setError(error,response)
    }
}

export const updateEvent = async (request, response) => {
    const { id } = request.params;
    const updatedEventData = { ...request.body };
    try {
        const updatedEvent = await eventService.updateEvent(id, updatedEventData);
        setResponse(updatedEvent, response);
    } catch (error) {
        setError(error, response);
    }
}


export const deleteEvent = async (request,response) =>{
    const {id} = request.params;
    try{
        const deletedEvent = await eventService.deleteEvent(id);
        setResponse(deletedEvent, response);
    }
    catch(error){
        setError(error,response)
    }
}

export const filterEvent = async (request,response) =>{
    const{eventId, creatorId} = request.query;
    try{
        const filteredEvent = await eventService.filterEvent(eventId,creatorId);
        setResponse(filteredEvent,response)
    }
    catch(error){
        setError(error,response)
    }
}

export const deleteAllEvents = async (request, response) => {
    try {
        const events = await eventService.deleteAllEvents();
        setResponse(events, response);
        
    } catch (error) {
        setError(error, response);
    }
};
