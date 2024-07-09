
import express from "express";
import * as doctorController from '../controllers/doctor-controller.js';

const doctorRouter = express.Router();

doctorRouter.route('/')
    .get(doctorController.search)
    .delete(doctorController.deleteAllDoctors)
    .post(doctorController.post); 

    doctorRouter.route('/:doctorId')
    .get(doctorController.get) 
    .put(doctorController.put)
    .delete(doctorController.del);

    doctorRouter.route('/filterD')
    .get(doctorController.filterDoctors);
    
    export default doctorRouter;