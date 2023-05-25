import db from '../database/database_connection.js';

class RegistrationsRepositories 
{
	create ({class_id, student_id}){
		const query = {
			text: `
        INSERT INTO registration (class_id, student_id)
        VALUES ($1,$2)
      `,
			values: [class_id, student_id]
		};
    
		return db.query(query);
	}

	update ( data, registrationId ){

		let SET = 'SET';
		let WHERE = 'WHERE registration.id = ';

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
			UPDATE registration
				${SET.replace( ',','' )}
        ${WHERE}
			`,
			values
		};
		console.log(data);
		console.log(query);
		return db.query( query );
	}

	list ({class_id, student_id}){
		const query = {
			text: `
      SELECT s.name, c.name AS class , r.entry_date, r.egress_date
        FROM registration r
        JOIN class c ON c.id = r.class_id
        JOIN students s ON s.id = r.student_id
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
			query.text+=` AND s.id = $${query.values.length}`;
		}

		query.text+=';';
    
		return db.query(query);
	}
}

export default RegistrationsRepositories;