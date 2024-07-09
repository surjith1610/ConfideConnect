import express from "express";

import * as patientController from "./../controllers/patient-controller.js";

const patientRouter = express.Router();

patientRouter.route('/')
    .get(patientController.getAll)
    .post(patientController.createPatient)
    .delete(patientController.deleteAllPatients);

patientRouter.route('/:patientId')
    .put(patientController.updatePatient)
    .delete(patientController.deletePatient)
    .get(patientController.getById);

export default patientRouter;
