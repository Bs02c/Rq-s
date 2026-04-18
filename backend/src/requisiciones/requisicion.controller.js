import {getAllRqServ, getSpecificRqServ, postRqServ} from "./requisicion.service.js";

async function getAllRqCtrl(req, res) {
    const result = await getAllRqServ();
    res.json(result);
};

async function getSpecificRqCtrl(req, res) {
    const {consecutivo} = req.params;
    const result = await getSpecificRqServ(consecutivo);
    res.json(result);
};

async function postRqCtrl(req, res) {
    const {
        solicitante, 
        repartidor, 
        destino, 
        codigo_solicitado, 
        cantidad, 
        observaciones} = req.body;
    const result = await postRqServ(
        solicitante, 
        repartidor, 
        destino, 
        codigo_solicitado, 
        cantidad, 
        observaciones);
        res.json(result)
}

export {getAllRqCtrl, getSpecificRqCtrl, postRqCtrl}; 