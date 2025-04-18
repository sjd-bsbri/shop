import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import ProductDetail from './components/ProductDetail'

function App() {
  return (
    <BrowserRouter basename='shop'>
    <Routes>
      <Route path='/'  element={<Home/>} />
      <Route path='/product/:id'  element={<ProductDetail/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App