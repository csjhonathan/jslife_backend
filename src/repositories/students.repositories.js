import db from '../database/database_connection.js';

class StudentsRepositories
{
	create ( {name, email, cpf, classId, photo} ){
		const query = {
			text: `
        INSERT INTO users (name, email, cpf, registration_class_id, photo)
				VALUES ($1, $2, $3, $4, $5)
				RETURNING id AS student_id
      `,
			values: [name, email, cpf, classId, photo]
		};

		return db.query( query );
	}

	getStudentByCpf ( {cpf} ){
		const query = {
			text: 'SELECT * FROM users WHERE cpf = $1 AND role_id = 1',
			values: [cpf]
		};
		
		return db.query( query );
	}

	getStudentByEmail ( {email} ){
		const query = {
			text: 'SELECT * FROM users WHERE email = $1 AND role_id = 1',
			values: [email]
		};

		return db.query( query );
	}
	
	getStudentById ( {studentId} ){
		const query = {
			text: `
			SELECT 
			u.id, 
			u.name, 
			u.cpf, 
			u.email, 
			u.photo, 
			u.registered AS "isRegistered",
			c.id AS "registrationClassId",
			c.name AS "registrationClass", 
			(
				SELECT json_build_object('id', r.id, 'class', cl.name, 'entry_date', r.entry_date, 'egress_date', r.egress_date)
				FROM registrations r
				JOIN classes cl ON cl.id = r.class_id
				WHERE r.id = u.current_registration_id
			) AS "currentRegistration",
			CASE
				WHEN COUNT(r.student_id) = 0 THEN NULL
				ELSE json_agg(json_build_object('id', r.id, 'class', cl.name, 'entry_date', r.entry_date, 'egress_date', r.egress_date) ORDER BY r.id DESC)
			END AS registrations
		FROM 
			users u
		JOIN 
			classes c ON c.id = u.registration_class_id
		LEFT JOIN 
			registrations r ON r.student_id = u.id
		LEFT JOIN 
			classes cl ON cl.id = r.class_id
		WHERE 
			u.id = $1 AND role_id = 1
		GROUP BY 
			u.id, 
			u.name, 
			u.cpf, 
			u.email, 
			u.photo, 
			u.registered,
			c.name, 
			c.id;
			`,
			values: [studentId]
		};

		return db.query( query );
	}

	getStudents ( {classId} ){
		const query = {
			text: `
			SELECT
			u.id, u.name, u.photo, u.cpf, u.registration_class_id,u.current_registration_id, u.registered AS "isRegistered", c.id AS class_id, c.name AS class_name
			FROM
					users u
			LEFT JOIN
					registrations r ON u.current_registration_id = r.id
			LEFT JOIN
					classes c ON r.class_id = c.id
			WHERE
					1=1
			`,
			values: []
		};

		if( classId ){
			query.values.push( classId );
			query.text+= ` AND c.id = $${query.values.length}`;
		}
		query.text+=' GROUP BY u.id, u.name, u.photo, u.cpf, u.registered, c.id, c.name';
		query.text+=' ORDER BY u.name';
		
		return db.query( query );
	}

	update ( user, student_id ){

		let SET = 'SET';
		let WHERE = 'WHERE id = ';

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
			UPDATE users
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