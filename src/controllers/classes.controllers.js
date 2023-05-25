import ClassesRepositores from '../repositories/classes.repositories.js';

const classRepo = new ClassesRepositores;
class ClassesControllers 
{
	async create (req, res){
		const {className} = req.body;
		try {
			await classRepo.create({className});
			return res.status(201).send({message: 'Turma criada!'});
		} catch (error) {
			return res.status( 500 ).send( {message: error.message} );
		}
	}

	async list (req, res){
		try {
			const {rows: classes} = await classRepo.list();

			return res.send(classes);
		} catch (error) {
			return res.status( 500 ).send( {message: error.message} );
		}
	}

	async update (req, res){
		const {classId, name, entry, start_date, ending_date} = res.locals;

		try {
			const {rows: [classes]} = await classRepo.update({name, entry, start_date, ending_date}, classId);

			return res.status(200).send(classes);
		} catch (error) {
			return res.status( 500 ).send( {message: error.message} );
		}
	}
}

export default ClassesControllers;