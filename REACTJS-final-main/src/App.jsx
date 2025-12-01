import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ProductsProvider } from "./contexts/ProductsContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Estilos globales
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export default function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <BrowserRouter>
            <Navbar />
            <main className="container py-4">
              <Routes>
                {/* Rutas Públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<ProductsPage />} />
                <Route path="/login" element={<Login />} />

                {/* Rutas Protegidas (Requieren Login) */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/carrito" element={<CartPage />} /> {/* Lo he movido aquí para cumplir consigna */}
                  <Route path="/admin" element={<Admin />} />
                </Route>
              </Routes>
            </main>
          </BrowserRouter>
          <ToastContainer position="top-right" autoClose={3000} />
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}
