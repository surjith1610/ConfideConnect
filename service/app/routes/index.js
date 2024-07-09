import userRouter from './user-routes.js'
import patientRouter from "./patient-route.js";
import medicalRequestRouter from "./medicalrequest-route.js";
import doctorRouter from './doctor-route.js';
import labRequestRouter from './labrequest-route.js';
import labRouter from './lab-route.js';
import blogRouter from './blog-route.js'
import donationRouter from './donation-route.js';
import eventRouter from './event-route.js';


const initializeRoutes = (app) =>{
    app.use('/confideconnect/users', userRouter);
    app.use('/confideconnect/patients', patientRouter);
    app.use('/confideconnect/medicalrequests', medicalRequestRouter);
    app.use('/confideconnect/doctors', doctorRouter);
    app.use('/confideconnect/labs', labRouter);
    app.use('/confideconnect/labrequests', labRequestRouter);
    app.use('/confideconnect/blogs', blogRouter);
    app.use('/confideconnect/donations', donationRouter);
    app.use('/confideconnect/events', eventRouter);
}

export default initializeRoutes;