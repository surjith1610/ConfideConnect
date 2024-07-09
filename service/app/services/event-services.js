// services for Event which defines CRUD operations
import Event from "../models/event.js";

export const getAllEvents = async () => {
    return await Event.find();
};

export const createEvent = async (eventData) => {
    const newEvent = new Event(eventData);  
    const savedEvent = await newEvent.save();  
    return savedEvent;  
};

export const updateEvent = async(id,eventUpdate) => {
    return await Event.updateOne({_id:id}, eventUpdate, { new: true });
};

export const deleteEvent = async(id) => {
    return await Event.deleteOne({_id:id});
};

export const filterEvent = async (eventId, creatorId) => {
    let filter = {};

    if (eventId) {
        filter._id = eventId; 
    }

    if (creatorId) {
        filter.creatorId = creatorId; 
    }
    return await Event.find(filter);
};

export const deleteAllEvents = async () => {
    return await Event.deleteMany();
};