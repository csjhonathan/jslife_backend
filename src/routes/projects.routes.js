import {Router} from 'express';
import {projectChema} from '../schemas/project.schema.js';
import schemaValidator from '../middlewares/schema.validator.js';
import ProjectsControllers from '../controllers/projects.controllers.js';

const projects = new ProjectsControllers;

const projectsRoutes = Router();

projectsRoutes.post('/projects/create', schemaValidator(projectChema), projects.create);
projectsRoutes.get('/projects/list', projects.list);

export default projectsRoutes;