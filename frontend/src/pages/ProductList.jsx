import { getAllProducts } from "../services/product.service.js"; 
import { useState, useEffect } from 'react'

function ProductList(){
    const [productos, setProductos] = useState([])
    useEffect(() => {
        async function cargarDatos(){
            const data = await getAllProducts()
            setProductos(data)
        }
        cargarDatos()
    }, []);
    return (
        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Saldo</th>
                    <th>Costo</th>
                    <th>Proveedor</th>
                    <th>Fecha ingreso</th>
                    <th>Ubicación</th>
                    <th>Stock mínimo</th>
                </tr>
            </thead>
            <tbody>
                {productos.map(p => (
                    <tr key={p.codigo}>
                        <td>{p.codigo}</td>
                        <td>{p.nombre}</td>
                        <td>{p.saldo}</td>
                        <td>{p.costo}</td>
                        <td>{p.proveedor}</td>
                        <td>{p.fecha_ingreso}</td>
                        <td>{p.ubicacion}</td>
                        <td>{p.stock_minimo}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export {ProductList};