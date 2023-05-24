import pg from 'pg';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

const{Pool} = pg;

const configDatabase = {
	connectionString: process.env.DATABASE_URL
};

if( process.env.MODE === 'prod' ) configDatabase.ssl = true;

const db = new Pool( configDatabase );

try {
	await db.connect();
	console.log( chalk.blue( 'DB CONNECTION SUCCESSFULLY' ) );
} catch ( err ) {
	console.error( chalk.red( 'DB CONNECTION FAILED' ), err );
}

export default db;