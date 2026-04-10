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
async function patchProductRepository(codigo, datos) {
    let entries = Object.entries(datos);
    let entriesKey = entries.map(([key, value], index) => {
        return `${key} = $${index + 1} ` //Esta línea retorna key con un indice para cada key ejemplo: ('key = $1, key2 = $2')
    });
    let setQuery = entriesKey.join(', ');
    let entriesValue = entries.map(([key, value]) => {
        return value; 
    });
    const resultado = await client.query(`UPDATE product 
        SET ${setQuery} 
        WHERE codigo = $${entriesValue.length + 1}`, [...entriesValue, codigo]);
    return resultado.rows
}

async function deleteProdRepo(codigo) {
    const resultado = await client.query(`DELETE FROM product WHERE codigo = $1 RETURNING *`, [codigo]);
    if (resultado.rowCount > 0) {
        console.log('Se eliminó correctamente');
    } else {
        console.log('No existía el registro');
    }; 
    return resultado.rows;
};

export {getAllProductsFromDB, insertProductRepos, patchProductRepository, deleteProdRepo};