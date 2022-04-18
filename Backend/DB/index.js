import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool();
const client = await pool.connect();

const query = (text, params) => pool.query(text, params);

export { pool, query };
