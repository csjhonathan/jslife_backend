import app from './app.js';
import chalk from 'chalk';
import 'dotenv/config';

const PORT = process.env.PORT || 5000;
	
app.listen( PORT , () => {
	console.log( `Server is running on ${chalk.green( `http://localhost:${PORT}` )}` );
} );