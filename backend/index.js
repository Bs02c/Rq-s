//Importing the database connection
import express from 'express'
import client from './src/database/connection.js'

const app = express() 

await client.connect() 
console.log('Conexión exitosa a PostgreSQL')

app.get('/health', (req, res) => {
  res.send('Health ok')
})
app.listen(3000)




