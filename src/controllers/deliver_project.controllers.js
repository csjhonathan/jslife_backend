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

	async list (req, res){
		const {classId: class_id, projectId: project_id} = req.query;
		const {studentId} = req.params;
		try {
			const {rows: projects} = await deliver.list({class_id, project_id, studentId});
			return res.status(200).send(projects);
		} catch (error) {
			return res.status( 500 ).send( {message: error.message} );
		}
	}

	async update (req, res){
		const {deliverId} = req.params;
		const {gradeId} = req.body;

		try {
			await deliver.update({gradeId, deliverId});
			return res.sendStatus(200);
		} catch (error) {
			return res.status( 500 ).send( {message: error.message} );
		}
	}

}


export default DeliverProjectControllers;