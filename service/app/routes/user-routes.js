import express from 'express';
import * as userController from '../controllers/user-controller.js';
import { authenticateToken } from '../middleware/jwt.js'; 


const router = express.Router();

router.route('/login').post(userController.loginUser)
router.route('/refresh').post(userController.refreshUserToken)

router.route('/reset').post(userController.getResetToken)
router.route('/reset/:token').post(userController.resetPassword)

router.route('/')
    .get(userController.getAll)
    .post(userController.createUser)
    .delete(userController.deleteAll);

router.route('/deleteAllPatients').delete(userController.deleteAllPatients);
router.route('/deleteAllDoctors').delete(userController.deleteAllDoctors);
router.route('/deleteAllLabs').delete(userController.deleteAllLabs);

router.route('/:userId')
    .get(authenticateToken, userController.getById)
    .put(authenticateToken, userController.updateUser)
    .delete(authenticateToken, userController.deleteUser);

export default router;