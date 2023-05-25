import {Router} from 'express';
import studentsRoutes from './students.routes.js';
import projectsRoutes from './projects.routes.js';
import deliverRoutes from './deliver_project.routes.js';
import registrationRoutes from './registrations.routes.js';
import classRoutes from './class.routes.js';

const routes = Router();

routes.use( studentsRoutes );
routes.use( projectsRoutes );
routes.use( deliverRoutes );
routes.use( registrationRoutes );
routes.use( classRoutes );

export default routes;