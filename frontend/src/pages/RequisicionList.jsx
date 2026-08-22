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
    const raw = "2024-11-03T00:00:00.000Z"
    const fecha = new Date(raw)
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
                {requisiciones.map(r => (
                    <tr key={r.consecutivo}>
                        <td>{r.consecutivo}</td>
                        <td>{r.fecha_solicitud.toLocaleDateString("es-CO", {
                            timeZone: "UTC",
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric"
                        })}</td>
                        <td>{r.solicitante}</td>
                        <td>{r.destino}</td>
                        <td>{r.codigo_solicitado}</td>
                        <td>{r.cantidad}</td>
                        <td>{r.observaciones}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export { RequisicionList };