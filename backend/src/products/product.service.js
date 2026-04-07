import {getAllProductsFromDB, insertProductRepos} from "./product.repository.js";

async function getAllProductsFromService(){
        const result = await getAllProductsFromDB();
        return result
    };

async function insertProductServ(codigo, nombre, saldo, costo, proveedor, ubicacion, stock_minimo){//Parametros recibidos
    const resultado = await insertProductRepos(//Argumentos que pasa a repository
        codigo,
        nombre, 
        saldo, 
        costo, 
        proveedor, 
        ubicacion, 
        stock_minimo);
    return resultado
};

 export {getAllProductsFromService, insertProductServ};