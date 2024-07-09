
import express from "express";
import * as labRequestController from '../controllers/labrequest-controller.js';

const labRequestRouter = express.Router();

labRequestRouter.route('/')
    .get(labRequestController.search)
     .delete(labRequestController.deleteAllLabReq)
    .post(labRequestController.post); 

    labRequestRouter.route('/filter')
    .get(labRequestController.filterLabRequest);

    labRequestRouter.route('/:requestId')
    .get(labRequestController.get) 
    .put(labRequestController.put)
    .delete(labRequestController.del);

    
    
    //labRequestRouter.delete('/', labRequestController.deleteAllLabReq);

    export default labRequestRouter;