import {getAllProductsFromService, insertProductServ, patchProductService, deleteProdServ, getProductByCodeServ, searchProductsServ} from "./product.service.js";

async function getAllProductsFromCtrl(req, res) {
    const result = await getAllProductsFromService();
    res.json(result);
}
 
async function insertProductCtrl(req, res) {
    const { codigo, nombre, saldo, costo, proveedor, ubicacion, stock_minimo } = req.body;

    if (!codigo || typeof codigo !== 'string' || codigo.trim() === '')
        return res.status(400).json({ error: 'codigo es obligatorio' });
    if (codigo.length > 50)
        return res.status(400).json({ error: 'codigo supera los 50 caracteres' });
    if (!nombre || typeof nombre !== 'string' || nombre.trim() === '')
        return res.status(400).json({ error: 'nombre es obligatorio' });
    if (nombre.length > 200)
        return res.status(400).json({ error: 'nombre supera los 200 caracteres' });
    if (!Number.isInteger(saldo) || saldo < 0)
        return res.status(400).json({ error: 'saldo debe ser un entero no negativo' });
    if (!Number.isInteger(costo) || costo < 0)
        return res.status(400).json({ error: 'costo debe ser un entero no negativo' });
    if (proveedor != null && proveedor.length > 100)
        return res.status(400).json({ error: 'proveedor supera los 100 caracteres' });
    if (ubicacion != null && ubicacion.length > 100)
        return res.status(400).json({ error: 'ubicacion supera los 100 caracteres' });
    if (stock_minimo != null && (!Number.isInteger(stock_minimo) || stock_minimo < 0))
        return res.status(400).json({ error: 'stock_minimo debe ser un entero no negativo' });

    const resultado = await insertProductServ(codigo, nombre, saldo, costo, proveedor, ubicacion, stock_minimo);
    res.status(201).json(resultado);
}

async function patchProCtrl(req, res) {
    const { codigo } = req.params;
    const { nombre, saldo, costo, proveedor, ubicacion, stock_minimo } = req.body;

    const datos = {};
    if (nombre !== undefined) {
        if (typeof nombre !== 'string' || nombre.trim() === '')
            return res.status(400).json({ error: 'nombre inválido' });
        if (nombre.length > 200)
            return res.status(400).json({ error: 'nombre supera los 200 caracteres' });
        datos.nombre = nombre;
    }
    if (saldo !== undefined) {
        if (!Number.isInteger(saldo) || saldo < 0)
            return res.status(400).json({ error: 'saldo debe ser un entero no negativo' });
        datos.saldo = saldo;
    }
    if (costo !== undefined) {
        if (!Number.isInteger(costo) || costo < 0)
            return res.status(400).json({ error: 'costo debe ser un entero no negativo' });
        datos.costo = costo;
    }
    if (proveedor !== undefined) {
        if (proveedor != null && proveedor.length > 100)
            return res.status(400).json({ error: 'proveedor supera los 100 caracteres' });
        datos.proveedor = proveedor;
    }
    if (ubicacion !== undefined) {
        if (ubicacion != null && ubicacion.length > 100)
            return res.status(400).json({ error: 'ubicacion supera los 100 caracteres' });
        datos.ubicacion = ubicacion;
    }
    if (stock_minimo !== undefined) {
        if (!Number.isInteger(stock_minimo) || stock_minimo < 0)
            return res.status(400).json({ error: 'stock_minimo debe ser un entero no negativo' });
        datos.stock_minimo = stock_minimo;
    }

    if (Object.keys(datos).length === 0)
        return res.status(400).json({ error: 'Se requiere al menos un campo para actualizar' });

    const resultado = await patchProductService(codigo, datos);
    res.json(resultado);
}

async function deleteProdCtrl(req, res) {
    const { codigo } = req.params;
    const resultado = await deleteProdServ(codigo);
    res.json(resultado);
}

async function getProductByCodeCtrl(req, res) {
    const { codigo } = req.params;
    const producto = await getProductByCodeServ(codigo);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
}

async function searchProductsCtrl(req, res) {
    const { q } = req.query;
    if (!q || typeof q !== 'string' || q.trim() === '')
        return res.status(400).json({ error: 'El parámetro q es obligatorio' });
    const productos = await searchProductsServ(q.trim());
    res.json(productos);
}

export {getAllProductsFromCtrl, insertProductCtrl, patchProCtrl, deleteProdCtrl, getProductByCodeCtrl, searchProductsCtrl};