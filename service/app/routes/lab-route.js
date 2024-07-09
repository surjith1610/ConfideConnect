import express from "express";
import * as labController from '../controllers/lab-controller.js';

const labRouter = express.Router();

labRouter.route('/')
    .get(labController.search) 
    .delete(labController.deleteAllLab)
    .post(labController.post); 

    labRouter.route('/:labId')
    .get(labController.get) 
    .put(labController.put)
    .delete(labController.del); 

    labRouter.route('/filterL')
    .get(labController.filterLabs);

    //labRouter.delete('/', labRouter.deleteAllLab);

    export default labRouter;