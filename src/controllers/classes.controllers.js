import ClassesRepositores from '../repositories/classes.repositories.js';

const classes = new ClassesRepositores;
class ClassesControllers 
{
	async create (req, res){
		const {className} = req.body;
		try {
			await classes.create({className});
			return res.status(201).send({message: 'Turma criada!'});
		} catch (error) {
			return res.status( 500 ).send( {message: error.message} );
		}
	}

	async list (req, res){
		try {
			const {rows: classesList} = await classes.list();

			return res.send(classesList);
		} catch (error) {
			return res.status( 500 ).send( {message: error.message} );
		}
	}

	async update (req, res){
		const {name, entry, start_date, ending_date} = res.locals;
		const{classId} = req.params;

		try {
			const {rows: [updatedClass]} = await classes.update({name, entry, start_date, ending_date}, classId);

			return res.status(200).send(updatedClass);
		} catch (error) {
			return res.status( 500 ).send( {message: error.message} );
		}
	}
}

export default ClassesControllers;