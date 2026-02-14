const { log } = require('console');
const pg= require('pg');
require('dotenv').config();
const pool= new pg.Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

pool.connect()
.then(()=> console.log('Conexion exitosa a la db'))
.catch((e)=> console.log(`Eror al conectar a la db: ${e}`));

module.exports= pool;