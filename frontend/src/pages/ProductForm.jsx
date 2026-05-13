import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createProducts, getProductByCode, updateProduct } from '../services/product.service.js';

function ProductForm() {
    const { codigo } = useParams();
    const isEditing = Boolean(codigo);

    const [form, setForm] = useState({
        codigo: '',
        nombre: '',
        saldo: '',
        costo: '',
        proveedor: '',
        fecha_ingreso: '',
        ubicacion: '',
        stock_minimo: '',
    });

    useEffect(() => {
        if (!isEditing) return;
        getProductByCode(codigo).then(product => {
            setForm({
                codigo:        product.codigo,
                nombre:        product.nombre,
                saldo:         product.saldo,
                costo:         product.costo,
                proveedor:     product.proveedor     ?? '',
                fecha_ingreso: product.fecha_ingreso ?? '',
                ubicacion:     product.ubicacion     ?? '',
                stock_minimo:  product.stock_minimo  ?? '',
            });
        });
    }, [codigo, isEditing]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const payload = {
            ...form,
            saldo:        Number(form.saldo),
            costo:        Number(form.costo),
            stock_minimo: form.stock_minimo !== '' ? Number(form.stock_minimo) : null,
        };
        try {
            if (isEditing) {
                const { codigo: _codigo, ...datos } = payload;
                const result = await updateProduct(codigo, datos);
                console.log('Producto actualizado:', result);
            } else {
                const result = await createProducts(payload);
                console.log('Producto creado:', result);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="codigo"        value={form.codigo}       onChange={handleChange} placeholder="Código"       disabled={isEditing} />
            <input name="nombre"        value={form.nombre}       onChange={handleChange} placeholder="Nombre" />
            <input name="saldo"         value={form.saldo}        onChange={handleChange} placeholder="Saldo"         type="number" />
            <input name="costo"         value={form.costo}        onChange={handleChange} placeholder="Costo"         type="number" />
            <input name="proveedor"     value={form.proveedor}    onChange={handleChange} placeholder="Proveedor" />
            <input name="ubicacion"     value={form.ubicacion}    onChange={handleChange} placeholder="Ubicación" />
            <input name="stock_minimo"  value={form.stock_minimo} onChange={handleChange} placeholder="Stock mínimo"  type="number" />
            <button type="submit">Guardar</button>
        </form>
    );
}

export { ProductForm };
