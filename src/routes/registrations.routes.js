import RegistrationsControllers from '../controllers/registrations.controllers.js';
import {Router} from 'express';
import schemaValidator from '../middlewares/schema.validator.js';
import {registrationSchema, updateRegistrationSchema, closeRegistrationSchema} from '../schemas/registration.schema.js';
import registrationExists from '../middlewares/registrationExist.js';
import studentExist from '../middlewares/studentExists.js';
const registration = new RegistrationsControllers;
const registrationRoutes = Router();

registrationRoutes.get('/registrations/list', registration.list);
registrationRoutes.patch('/registrations/update/:registrationId', schemaValidator(updateRegistrationSchema), registrationExists(), registration.update);
registrationRoutes.patch('/registrations/close/:registrationId', schemaValidator(closeRegistrationSchema), registrationExists(), registration.close);
registrationRoutes.post('/registrations/create/:studentId',schemaValidator(registrationSchema) , studentExist(), registration.create);

export default registrationRoutes;