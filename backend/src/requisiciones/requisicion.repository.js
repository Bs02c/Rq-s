import client from "../database/connection.js";

async function getAllRqRepo(){
    const resultado = await client.query("SELECT * FROM  requisiciones");
    return resultado.rows;
};

async function getSpecificRqRepo(consecutivo) {
    const resultado = await client.query(`SELECT * FROM requisiciones WHERE consecutivo = $1`, [consecutivo]);
    return resultado.rows;
}

async function postRqRepo(solicitante, repartidor, destino, codigo_solicitado, cantidad, observaciones) {
     const insert =  await client.query(`INSERT INTO requisiciones (
        solicitante, 
        repartidor, 
        destino, 
        codigo_solicitado, 
        cantidad, 
        observaciones) VALUES ($1, $2, $3, $4, $5, $6)`, 
        [consecutivo, solicitante, repartidor, destino, codigo_solicitado, cantidad, observaciones]);
    return insert.rows;        
};

export {getAllRqRepo, getSpecificRqRepo, postRqRepo}; 