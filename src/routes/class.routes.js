import {Router} from 'express';
import ClassesControllers from '../controllers/classes.controllers.js';
import {createClassSchema, updateClassSchema} from '../schemas/class.schema.js';
import schemaValidator from '../middlewares/schema.validator.js';

const classes  = new ClassesControllers;
const classRoutes = Router();

classRoutes.post('/classes/create', schemaValidator(createClassSchema), classes.create);
classRoutes.get('/classes/list', classes.list);
classRoutes.patch('/classes/update/:classId', schemaValidator(updateClassSchema), classes.update);


export default classRoutes;