import {Router} from 'express';
import {studentSchemaRegister, studentSchemaUpdate} from '../schemas/student.schema.js';
import StudentsControllers from '../controllers/students.controllers.js';
import schemaValidator from '../middlewares/schema.validator.js';
import studentExist from '../middlewares/studentExists.js';

const students = new StudentsControllers;

const studentsRoutes = Router();

studentsRoutes.post( '/students/register', schemaValidator( studentSchemaRegister ), studentExist(), students.create );
studentsRoutes.patch( '/students/update/:studentId', schemaValidator( studentSchemaUpdate ), studentExist(), students.update );
studentsRoutes.get( '/students/list', students.list );
studentsRoutes.get( '/students/list/:studentId', students.getStudentById );

export default studentsRoutes;