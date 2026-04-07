import {getAllProductsFromService, insertProductServ} from "./product.service.js";

async function getAllProductsFromCtrl(req, res) {
    const result = await getAllProductsFromService();
    res.json(result);
}

async function insertProductCtrl(req, res) {
    const { //Esto es desestructuración: en lugar de escribir req.body.codigo, req.body.nombre etc... Aplicar desestructuración.
        codigo, 
        nombre, 
        saldo, 
        costo, 
        proveedor,  
        ubicacion, 
        stock_minimo 
    } = req.body;// body porque viene del body de la página   
    const resultado = await insertProductServ(//Estos son los argumentos para pasar a service
        codigo, 
        nombre, 
        saldo, 
        costo, 
        proveedor,  
        ubicacion, 
        stock_minimo
    );
    res.json(resultado);
}

 export {getAllProductsFromCtrl, insertProductCtrl};