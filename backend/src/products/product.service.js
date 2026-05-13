import {getAllProductsFromDB, insertProductRepos, patchProductRepository, deleteProdRepo, getProductByCodeRepo, searchProductsRepo} from "./product.repository.js";

async function getAllProductsFromService(){
        const result = await getAllProductsFromDB();
        return result;
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
    return resultado;
};

async function patchProductService(codigo, datos) {
    const resultado = await patchProductRepository(
        codigo, datos);
    return resultado
};

async function deleteProdServ(codigo) {
    const resultado = await deleteProdRepo(codigo);
    return resultado;
} 

async function getProductByCodeServ(codigo) {
    return await getProductByCodeRepo(codigo);
}

async function searchProductsServ(q) {
    return await searchProductsRepo(q);
}

export {getAllProductsFromService, insertProductServ, patchProductService, deleteProdServ, getProductByCodeServ, searchProductsServ};