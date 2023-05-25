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

	list ({class_id, project_id}){
		const query = {
			text: `
			SELECT pd.id AS deliver_id, s.name AS student_name, p.name AS project_name , pd.repository, c.name AS class_name , pd.deliver_date, g.name AS grade
			FROM project_deliver pd
			LEFT JOIN students s ON s.id = pd.student_id
			LEFT JOIN projects p ON p.id = pd.project_id
			LEFT JOIN class c ON c.id = pd.class_id
			LEFT JOIN grades g ON g.id = pd.grade_id
			WHERE 1=1
      `,
			values: []
		};

		if(class_id){
			query.values.push(class_id);
			query.text+=` AND c.id = $${query.values.length}`;
		}

		if(project_id){
			query.values.push(project_id);
			query.text+=` AND p.id = $${query.values.length}`;
		}
		query.text+=`
			ORDER BY deliver_id
			ASC;
		`;
		return db.query(query);
	}

}

export default DeliverProjectRepositories;