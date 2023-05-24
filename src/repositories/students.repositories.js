import db from '../database/database_connection.js';

class StudentsRepositories
{
	create ( {name, email, cpf, classId, photo} ){
		const query = {
			text: `
        INSERT INTO students (name, email, cpf, class_id, photo)
        VALUES ($1, $2, $3, $4, $5)
      `,
			values: [name, email, cpf, classId, photo]
		};

		return db.query( query );
	}

	getStudentByCpf ( {cpf} ){
		const query = {
			text: 'SELECT * FROM students WHERE cpf = $1',
			values: [cpf]
		};
		
		return db.query( query );
	}

	getStudentByEmail ( {email} ){
		const query = {
			text: 'SELECT * FROM students WHERE email = $1',
			values: [email]
		};

		return db.query( query );
	}
	
}

export default StudentsRepositories;