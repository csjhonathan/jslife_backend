import {Router} from 'express';
import {studentSchemaRegister, studentSchemaUpdate, studentSchemaSelfUpdate, studentSchemaSelfUpdatePassword} from '../schemas/student.schema.js';
import StudentsControllers from '../controllers/students.controllers.js';
import schemaValidator from '../middlewares/schema.validator.js';
import studentExist from '../middlewares/studentExists.js';
import {signInSchema} from '../schemas/signIn.schema.js';
import tokenValidate from '../middlewares/token.validator.js';

const students = new StudentsControllers;

const studentsRoutes = Router();

studentsRoutes.post( '/students/register', schemaValidator( studentSchemaRegister ), studentExist(), students.create );
studentsRoutes.patch( '/students/update/:studentId', schemaValidator( studentSchemaUpdate ), studentExist(), students.update );
studentsRoutes.patch( '/students/update/me/:studentId', tokenValidate, schemaValidator( studentSchemaSelfUpdate ), studentExist(), students.update );
studentsRoutes.patch( '/students/update/password/:studentId', tokenValidate, schemaValidator( studentSchemaSelfUpdatePassword ), studentExist(), students.updatePassowrd );
studentsRoutes.get( '/students/list', students.list );
studentsRoutes.get( '/students/list/:studentId', students.getStudentById );
studentsRoutes.post( '/students/signin',schemaValidator( signInSchema ), studentExist(), students.getStudentByEmail );

export default studentsRoutes;