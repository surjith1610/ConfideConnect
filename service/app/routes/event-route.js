import express from 'express';
import * as eventController from '../controllers/event-controller.js'

const eventRouter = express.Router();

eventRouter.route('/')
.get(eventController.getAllEvents)      
.post(eventController.createEvent)       
.delete(eventController.deleteAllEvents); 

eventRouter.route('/filter')
.get( eventController.filterEvent); 

eventRouter.route('/:id')
.put(eventController.updateEvent)       
.delete(eventController.deleteEvent);  



export default eventRouter;