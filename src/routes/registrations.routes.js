import RegistrationsControllers from '../controllers/registrations.controllers.js';
import {Router} from 'express';

const registration = new RegistrationsControllers;
const registrationRoutes = Router();


registrationRoutes.patch('/registrations/:registrationId', registration.update);
registrationRoutes.get('/registrations/list', registration.list);

export default registrationRoutes;