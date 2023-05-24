import db from '../database/database_connection.js';

class DeliverProjectRepositories
{
	create ({project_id, class_id, student_id, repository}){
		const query = {
			text: `
        INSERT INTO project_deliver (project_id, class_id, student_id, repository)
        VALUES ($1,$2,$3,$4)
        RETURNING *
      ;
      `,
			values: [project_id, class_id, student_id, repository],
		};

		return db.query(query);
	}
}

export default DeliverProjectRepositories;