//Importing the database connection
import express from 'express'
import client from './src/database/connection.js'
import router from './src/products/product.routes.js'

const app = express()
app.use(express.json());

await client.connect() 
console.log('Conexión exitosa a PostgreSQL')

/**Verificación del healthcheck de 
 * docker*/

app.get('/health', (req, res) => {
  res.send('Health ok')
});

/**Recibe los productos desde 
 * product.controller.js */
app.use('/products', router);




app.listen(3000)






