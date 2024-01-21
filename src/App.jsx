import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from './pages/products.jsx';
import Reviews from './pages/reviews.jsx';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/reviews/:productId" element={<Reviews />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
