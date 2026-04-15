import {getAllRqRepo, getSpecificRqRepo, postRqRepo} from "./requisiciones.repository.js";

async function getAllRqServ() {
        const result = await getAllRqRepo();
        return result;
};

async function getSpecificRqServ(consecutivo){
    const result = await getSpecificRqRepo(consecutivo);
    return result;
};

async function postRqServ(solicitante, repartidor, destino, codigo_solicitado, cantidad, observaciones){
     const result = await postRqRepo(       
        solicitante, 
        repartidor, 
        destino, 
        codigo_solicitado, 
        cantidad, 
        observaciones);   
    return result;    
}; 
export {getAllRqServ, getSpecificRqServ, postRqServ};