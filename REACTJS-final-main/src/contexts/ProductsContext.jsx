import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProductsContext = createContext();
const API = import.meta.env.VITE_API_URL || "https://fakestoreapi.com/products";

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("Error fetching products");
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      setError(e.message);
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const createProduct = async (payload) => {
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Create failed");
      const newP = await res.json();
      setProducts(prev => [newP, ...prev]);
      toast.success("Producto creado");
      return newP;
    } catch (e) {
      toast.error(e.message);
      throw e;
    }
  };

  const updateProduct = async (id, updates) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      setProducts(prev => prev.map(p => p.id === id ? updated : p));
      toast.success("Producto actualizado");
      return updated;
    } catch (e) {
      toast.error(e.message);
      throw e;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success("Producto eliminado");
    } catch (e) {
      toast.error(e.message);
      throw e;
    }
  };

  return (
    <ProductsContext.Provider value={{
      products, loading, error,
      fetchProducts, createProduct, updateProduct, deleteProduct
    }}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => useContext(ProductsContext);
