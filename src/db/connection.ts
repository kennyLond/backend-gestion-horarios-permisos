import mysql from 'mysql';
import keys from '../routes/keys';

const connection: mysql.Connection = mysql.createConnection(keys);

export default connection;

//esto es base de datos