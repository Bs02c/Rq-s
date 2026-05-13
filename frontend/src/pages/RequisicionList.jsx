import { getAllRq } from "../services/requisicion.service.js"
import { useState, useEffect } from 'react'

function RequisicionList(){
    const [requisiciones, setRequisiciones] = useState([])
    useEffect(() => {
        async function cargarDatos(){
            const data = await getAllRq()
            setRequisiciones(data)
        }
        cargarDatos()
    },[]);
    return(
        <table>
            <thead>
                <tr>
                    <th>Consecutivo</th>
                    <th>Fecha Solicitud</th>
                    <th>Solicitante</th>
                    <th>Destino</th>
                    <th>Código Solicitado</th>
                    <th>Cantidad</th>
                    <th>Observaciones</th>
                </tr>
            </thead>
            <tbody>
                {requisiciones.map(p => (
                    <tr key={p.consecutivo}>
                        <td>{p.consecutivo}</td>
                        <td>{p.fecha_solicitud}</td>
                        <td>{p.solicitante}</td>
                        <td>{p.destino}</td>
                        <td>{p.codigo_solicitado}</td>
                        <td>{p.cantidad}</td>
                        <td>{p.observaciones}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export { RequisicionList };