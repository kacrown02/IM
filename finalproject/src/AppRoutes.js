import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import CupPage from './pages/cup/CupPage';
import CartPage from './pages/Cart/CartPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search/:searchTerm" element={<HomePage />} />
      <Route path="/tag/:tag" element={<HomePage />} />
      <Route path="/cup/:id" element={<CupPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
}
