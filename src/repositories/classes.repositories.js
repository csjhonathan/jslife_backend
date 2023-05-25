import db from '../database/database_connection.js';

class ClassesRepositores
{
	create ({className}){
		const query = {
			text: `
        INSERT INTO class (name)
        VALUES ($1)
      `,
			values: [className]
		};

		return db.query(query);
	}

	list (){
		const query = {
			text: `
        SELECT * FROM class`,
			values: []
		};

		return db.query(query);
	}

	update ( data, classId){

		let SET = 'SET';
		let WHERE = 'WHERE class.id = ';

		const values = [];

		for( const props in data ){

			if( !data[props] ) continue;
			values.push( data[props] );
			SET += `, ${props} = ${'$' + values.length}`;
			
		}

		values.push( classId);
		
		WHERE += `${'$' + values.length}`;
		const query = {
			text: `
			UPDATE class
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

export default ClassesRepositores;