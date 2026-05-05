//*Anatonmía
// Exportar funciones async (Una por operación con fetch y pasa a json) */

const BASE_URL = 'http://localhost:3000/requisicion'

async function getAllRq() {
  const response = await fetch(BASE_URL)
  if (!response.ok) throw new Error('Error al obtener las requisiciones')
  return response.json()
};

async function getSpecificRq(consecutivo) {
  const response = await fetch(`${BASE_URL}/${consecutivo}`)
  if (!response.ok) throw new Error(`Error al obtener el consecutivo: ${consecutivo}`);
  return response.json()
};

async function createRq(requisicionData) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type' : 'application/json' },
    body: JSON.stringify(requisicionData)
  })
  if (!response.ok) throw new Error('Error al crear la requisición')
  return response.json()
};

export {getAllRq, getSpecificRq, createRq};