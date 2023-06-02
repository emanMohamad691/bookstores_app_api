const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

//configrations
const db_Config = {
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 300,
  idleTimeoutMillis: 200,
  max: 20,
  allowExitOnIdle: true,
}
//new pool
const pool = new Pool(db_Config);

//check connection

pool.on('connect', (client) => {
  console.log("db connected and new client connect")
});

pool.on('remove', (client) => {
  console.log("db connection end  and  client is removed")
});

module.exports = pool;