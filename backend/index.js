//Importing the database connection
import express from 'express';
import client from './src/database/connection.js';
import routerProduct from './src/products/product.routes.js';
import routerRequisicion from './src/requisiciones/requisicion.routes.js';

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
app.use('/products', routerProduct);
app.use('/requisicion', routerRequisicion);




app.listen(3000)






