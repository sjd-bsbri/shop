import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import ProductDetail from './components/ProductDetail'
import Layout from './components/Layout' // Import the Layout component

function App() {
  return (
    <BrowserRouter basename='shop'>
      <Routes>
        {/* Wrap routes that need the header/footer with the Layout component */}
        <Route path='/' element={<Layout />}>
          {/* Index route for the homepage */}
          <Route index element={<Home />} /> 
          {/* Route for product details */}
          <Route path='product/:id' element={<ProductDetail />} />
          {/* Add other routes that should have the layout here */}
        </Route>
        {/* Add routes without the layout here if needed */}
      </Routes>
    </BrowserRouter>
  )
}

export default App