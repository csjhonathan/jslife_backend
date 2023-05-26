import db from '../database/database_connection.js';

class StudentsRepositories
{
	create ( {name, email, cpf, classId, photo} ){
		const query = {
			text: `
        INSERT INTO students (name, email, cpf, class_id, photo)
        	VALUES ($1, $2, $3, $4, $5)
					RETURNING id AS student_id
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
	
	getStudentById ( {studentId} ){
		const query = {
			text: `
			SELECT s.id, s.name, s.cpf, s.email, s.photo, c.name AS class, c.id AS "classId",
			CASE
					WHEN COUNT(r.id) = 0 THEN NULL
					ELSE COALESCE(json_agg(json_build_object('id', r.id, 'class', cl.name, 'entry_date', r.entry_date, 'egress_date', r.egress_date)ORDER BY r.egress_date DESC), '[]')
			END AS registrations,
			MAX(CASE WHEN r.egress_date IS NULL THEN r.id END) AS "currentRegistration"
			FROM students s
			JOIN class c ON c.id = s.class_id
			LEFT JOIN registration r ON r.student_id = s.id
			LEFT JOIN class cl ON cl.id = r.class_id
			WHERE s.id = $1
			GROUP BY s.id, s.name, s.cpf, s.email, s.photo, c.name, c.id;
			`,
			values: [studentId]
		};

		return db.query( query );
	}

	getStudents ( {classId} ){
		const query = {
			text: `
			SELECT 
			s.id, s.name, s.email, s.cpf, s.photo, c.name AS class, c.id AS classId , r.name AS role,
			CASE WHEN COUNT(reg.student_id) > 0 THEN TRUE ELSE FALSE END AS registered
			FROM students s
			LEFT JOIN class c ON c.id = s.class_id
			LEFT JOIN roles r ON r.id = s.role_id
			LEFT JOIN registration reg ON reg.student_id = s.id
			WHERE 1=1
			`,
			values: []
		};

		if( classId ){
			query.values.push( classId );
			query.text+= ` AND s.class_id = $${query.values.length}`;
		}
		query.text+=' GROUP BY s.id, s.name, s.email, s.cpf, s.photo, c.name, c.id, r.name';
		query.text+=' ORDER BY s.name';
		
		return db.query( query );
	}

	update ( user, student_id ){

		let SET = 'SET';
		let WHERE = 'WHERE students.id = ';

		const values = [];

		for( const props in user ){

			if( !user[props] ) continue;
			values.push( user[props] );
			SET += `, ${props} = ${'$' + values.length}`;
			
		}

		values.push( student_id );
		
		WHERE += `${'$' + values.length}`;
		const query = {
			text: `
			UPDATE students
				${SET.replace( ',','' )}
        ${WHERE}
			  RETURNING *
			`,
			values
		};

		query.text+=';';
		return db.query( query );
	}
}

export default StudentsRepositories;