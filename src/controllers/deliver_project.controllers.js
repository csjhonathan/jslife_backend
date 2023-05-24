import DeliverProjectRepositories from '../repositories/deliver_project.repositories.js';

const deliver = new DeliverProjectRepositories;

class DeliverProjectControllers
{
	async create (req, res){
    
		const {project_id, class_id, student_id, repository} = res.locals;

		try {
			const {rows: [project]} = await deliver.create({project_id, class_id, student_id, repository});
			return res.status(201).send(project);
		} catch (error) {
			return res.status( 500 ).send( {message: error.message} );
		}
	}
}


export default DeliverProjectControllers;