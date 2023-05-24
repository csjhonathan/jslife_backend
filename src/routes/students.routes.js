import {Router} from 'express';
import {studentSchema} from '../schemas/student.schema.js';
import StudentsControllers from '../controllers/students.controllers.js';
import schemaValidator from '../middlewares/schema.validator.js';
import studentExist from '../middlewares/studentExists.js';

const students = new StudentsControllers;

const studentsRoutes = Router();

studentsRoutes.post( '/students/register', schemaValidator( studentSchema ), studentExist(), students.create );

export default studentsRoutes;