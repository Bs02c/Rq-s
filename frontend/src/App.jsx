import { Routes, Route } from 'react-router-dom'
import { ProductDetail } from './pages/ProductDetail'
import { ProductForm } from './pages/ProductForm'
import { ProductList } from './pages/ProductList'
import { RequisicionForm } from './pages/RequisicionForm'
import { RequisicionList } from './pages/RequisicionList'


function App() {
  return (
    <Routes>
      <Route path="/productos/:codigo" element={<ProductDetail />} />
      <Route path="/productos/nuevo" element={<ProductForm />} />
      <Route path="/productos" element={<ProductList />} />
      <Route path="/requisiciones/nueva" element={<RequisicionForm />} />
      <Route path="/requisiciones" element={<RequisicionList />} />
    </Routes>
  )
}

export default App