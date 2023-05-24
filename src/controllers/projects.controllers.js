import ProjectsRepositories from '../repositories/projects.repositories.js';

const projects = new ProjectsRepositories;

class ProjectsControllers{
	async create (_req,res ){
		const {name: projectName} = res.locals;
    
		try {
			await projects.create({projectName});
			return res.status(201).send({message: 'Projeto Criado!'});
		} catch (error) {
			return res.status( 500 ).send( {message: error.message} );
		}
	}

	async list (req,res ){
		const {projectName, projectId} = req.query;
    
		try {
			const {rows: projectsList} = await projects.list({projectName, projectId});
			return res.status(201).send(projectsList);
		} catch (error) {
			return res.status( 500 ).send( {message: error.message} );
		}
	}
	
}

export default ProjectsControllers;