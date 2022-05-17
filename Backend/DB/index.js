import pg from 'pg';
import dotenv from 'dotenv';


dotenv.config();

const pool = new pg.Pool();
// const pool = new pg.Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

const query = (text, params) => pool.query(text, params);

export { pool, query };
