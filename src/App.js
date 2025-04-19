import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import ProductDetail from './components/ProductDetail'
import Layout from './components/Layout' 
import About from './components/About'
function App() {
  return (
    <BrowserRouter basename='shop'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} /> 
          <Route path='product/:id' element={<ProductDetail />} />
          <Route path='about' element={<About />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App