//*Anatonmía
// Exportar funciones async (Una por operación con fetch y pasa a json) */

const BASE_URL = 'http://localhost:3000/products'

async function getAllProducts() {
  const response = await fetch(BASE_URL)
  if (!response.ok) throw new Error('Error al obtener producto')
  return response.json()
}

async function createProducts(data) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type' : 'application/json' },
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error('Error al crear producto')
  return response.json()
}


async function getProductByCode(codigo) {
  const response = await fetch(`${BASE_URL}/${codigo}`)
  if (!response.ok) throw new Error(`Error al obtener el producto con el código: ${codigo}`);
  return response.json()
}

async function updateProduct(codigo, data) {
    const response = await fetch(`${BASE_URL}/${codigo}`, {
    method: 'PATCH',
    headers: { 'Content-Type' : 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error(`Error al actualizar el codigo: ${codigo}`);
  return response.json()
};

export { getAllProducts, createProducts, getProductByCode, updateProduct }; 

