import db from '../database/database_connection.js';

class DeliverProjectRepositories
{
	create ({project_id, class_id, student_id, repository}){
		const query = {
			text: `
        INSERT INTO delivered_projects (project_id, class_id, student_id, repository)
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
			SELECT pd.id AS deliver_id, u.name AS student_name, p.name AS project_name , pd.repository, c.name AS class_name , pd.delivery_date, g.name AS grade
			FROM delivered_projects pd
			LEFT JOIN users u ON u.id = pd.student_id
			LEFT JOIN projects p ON p.id = pd.project_id
			LEFT JOIN classes c ON c.id = pd.class_id
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
			ORDER BY student_name
			ASC;
		`;
		return db.query(query);
	}

	update ({gradeId, deliverId}){
		const query = {
			text: 'UPDATE delivered_projects SET grade_id = $1 WHERE id = $2',
			values: [gradeId, deliverId]
		};

		return db.query(query);
	}
}

export default DeliverProjectRepositories;