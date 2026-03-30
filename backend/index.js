//Importing the database connection
import client from './src/database/connection.js'
await client.connect() 
console.log('Conexión exitosa a PostgreSQL')