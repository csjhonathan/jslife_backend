import {Router} from 'express';
import studentsRoutes from './students.routes.js';

const routes = Router();

routes.use( studentsRoutes );

export default routes;