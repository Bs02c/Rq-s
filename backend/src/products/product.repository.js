import client from "../database/connection.js";

//Devuelve [] de product
async function getAllProductsFromDB (){
    const result = await client.query("SELECT * FROM  product;");
    return result.rows;
};

//Insertar un nuevo repuesto
async function insertProductRepos(codigo, nombre, saldo, costo, proveedor, ubicacion, stock_minimo) {
    const resultado = await client.query(`INSERT INTO product (
        codigo, 
        nombre, 
        saldo, 
        costo, 
        proveedor,  
        ubicacion, 
        stock_minimo) VALUES ($1, $2, $3, $4, $5, $6, $7)`, //placeholders
        [codigo, nombre, saldo, costo, proveedor, ubicacion, stock_minimo]); //Le dice a pg con cual reemplazar los placeholders
    return resultado.rows;
}; 

//Actualizar un repuesto (PUT: Actualiza todo. PATCH: Actualiza por columnas)
async function patchProductRepos() {
    
}

export {getAllProductsFromDB, insertProductRepos, putProductRepos};