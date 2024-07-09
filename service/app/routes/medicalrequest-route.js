import express from "express";

import * as medicalRequestController from "./../controllers/medicalrequest-controller.js";

const medicalRequestRouter = express.Router();

medicalRequestRouter.route('/')
    .get(medicalRequestController.getAll)
    .post(medicalRequestController.createMedicalRequest)
    .delete(medicalRequestController.deleteAllmedicalRequests);

medicalRequestRouter.route('/filter')
    .get(medicalRequestController.filterMedicalRequest);

medicalRequestRouter.route('/:requestId')
    .put(medicalRequestController.updateMedicalRequest)
    .delete(medicalRequestController.deleteMedicalRequest)
    .get(medicalRequestController.getByID);



export default medicalRequestRouter;