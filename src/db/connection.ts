import mysql from 'mysql';
import keys from '../routes/keys';

const pool: mysql.Pool = mysql.createPool(keys);

export default pool;
