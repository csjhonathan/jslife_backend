import {Router} from 'express';
import studentsRoutes from './students.routes.js';
import projectsRoutes from './projects.routes.js';
import deliverRoutes from './deliver_project.routes.js';

const routes = Router();

routes.use( studentsRoutes );
routes.use( projectsRoutes );
routes.use( deliverRoutes );

export default routes;