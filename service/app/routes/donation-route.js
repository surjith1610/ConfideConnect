import express from 'express';
import * as donationController from '../controllers/donation-controller.js'

const donationRouter = express.Router();

donationRouter.route('/')
    .get(donationController.getAllDonations)
    .post(donationController.createDonation)
    .delete(donationController.deleteAllDonations);

donationRouter.route('/:id')
    .put(donationController.updateDonation)
    .delete(donationController.deleteDonation);

donationRouter.route('/filter')
.get( donationController.filterDonation);

export default donationRouter;