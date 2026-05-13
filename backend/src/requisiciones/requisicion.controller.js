import {getAllRqServ, getSpecificRqServ, postRqServ} from "./requisicion.service.js";

async function getAllRqCtrl(req, res) {
    const result = await getAllRqServ();
    res.json(result);
}

async function getSpecificRqCtrl(req, res) {
    const { consecutivo } = req.params;
    const consecutivoInt = parseInt(consecutivo, 10);
    if (!Number.isInteger(consecutivoInt) || consecutivoInt <= 0)
        return res.status(400).json({ error: 'consecutivo debe ser un entero positivo' });
    const result = await getSpecificRqServ(consecutivoInt);
    res.json(result);
}

async function postRqCtrl(req, res) {
    const { solicitante, repartidor, destino, codigo_solicitado, cantidad, observaciones } = req.body;

    if (!solicitante || typeof solicitante !== 'string' || solicitante.trim() === '')
        return res.status(400).json({ error: 'solicitante es obligatorio' });
    if (solicitante.length > 100)
        return res.status(400).json({ error: 'solicitante supera los 100 caracteres' });
    if (!repartidor || typeof repartidor !== 'string' || repartidor.trim() === '')
        return res.status(400).json({ error: 'repartidor es obligatorio' });
    if (repartidor.length > 100)
        return res.status(400).json({ error: 'repartidor supera los 100 caracteres' });
    if (!destino || typeof destino !== 'string' || destino.trim() === '')
        return res.status(400).json({ error: 'destino es obligatorio' });
    if (destino.length > 100)
        return res.status(400).json({ error: 'destino supera los 100 caracteres' });
    if (!codigo_solicitado || typeof codigo_solicitado !== 'string' || codigo_solicitado.trim() === '')
        return res.status(400).json({ error: 'codigo_solicitado es obligatorio' });
    if (codigo_solicitado.length > 50)
        return res.status(400).json({ error: 'codigo_solicitado supera los 50 caracteres' });
    if (!Number.isInteger(cantidad) || cantidad <= 0)
        return res.status(400).json({ error: 'cantidad debe ser un entero positivo' });
    if (observaciones != null && observaciones.length > 255)
        return res.status(400).json({ error: 'observaciones supera los 255 caracteres' });

    const result = await postRqServ(solicitante, repartidor, destino, codigo_solicitado, cantidad, observaciones);
    res.status(201).json(result);
}

export {getAllRqCtrl, getSpecificRqCtrl, postRqCtrl}; 