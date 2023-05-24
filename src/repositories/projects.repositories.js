import db from '../database/database_connection.js';

class ProjectsRepositories
{
	create ({projectName}){
		const query = {
			text: `
        INSERT INTO projects (name)
        VALUES ($1)
      `,
			values: [projectName]
		};

		return db.query(query);
	}

	list ({projectName, projectId}){
		const query = {
			text: `
        SELECT * FROM projects
        WHERE 1=1
      `,
			values: []
		};

		if(projectId){
			query.values.push(projectId);
			query.text+=` AND id = $${query.values.length}`;
		}

		if(projectName){
			query.values.push(projectName);
			query.text+=` AND name = $${query.values.length}`;
		}

		return db.query(query);
	}

}

export default ProjectsRepositories;