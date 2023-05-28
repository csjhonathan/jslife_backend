import db from '../database/database_connection.js';

class RegistrationsRepositories 
{
	create ({class_id, student_id}){
		const query = {
			text: `
        INSERT INTO registrations (class_id, student_id)
        VALUES ($1,$2)
				RETURNING id;
      `,
			values: [class_id, student_id]
		};
    
		return db.query(query);
	}

	update ( data, registrationId ){

		let SET = 'SET';
		let WHERE = 'WHERE id = ';

		const values = [];

		for( const props in data ){

			if( !data[props] ) continue;
			values.push( data[props] );
			SET += `, ${props} = ${'$' + values.length}`;
			
		}

		values.push( registrationId );
		
		WHERE += `${'$' + values.length};`;
		const query = {
			text: `
			UPDATE registrations
				${SET.replace( ',','' )}
        ${WHERE}
			`,
			values
		};
		return db.query( query );
	}

	getRegistrationById (registrationId){
		const query = {
			text: `
				SELECT * FROM registrations
				WHERE id = $1
			`,
			values: [registrationId]
		};

		return db.query(query);
	}
	list ({class_id, student_id}){
		const query = {
			text: `
      SELECT u.id, u.name, c.name AS class , r.entry_date, r.egress_date, r.class_id AS "classId"
        FROM registrations r
        JOIN classes c ON c.id = r.class_id
        JOIN users u ON u.id = r.student_id
        WHERE 1=1
      `
			,
			values: [],
		};
		if(class_id){
			query.values.push(class_id);
			query.text+=` AND c.id = $${query.values.length}`;
		}

		if(student_id){
			query.values.push(student_id);
			query.text+=` AND u.id = $${query.values.length}`;
		}

		query.text+=';';
    
		return db.query(query);
	}
}

export default RegistrationsRepositories;