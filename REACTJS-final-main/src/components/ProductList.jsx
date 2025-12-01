import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useProducts } from "../contexts/ProductsContext";
import { useCart } from "../contexts/CartContext";

export default function ProductList({ onEdit, onDelete, search = "", pageItems = null }) {
  const { products, loading, error, fetchProducts } = useProducts();
  const { addToCart } = useCart();

  useEffect(() => {
    if (!products.length) fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">Error: {error}</div>;

  // filter
  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    (p.category && p.category.toLowerCase().includes(search.toLowerCase()))
  );

  const list = pageItems ? pageItems : filtered;

  return (
    <section className="product-list">
      {list.map(p => (
        <ProductCard
          key={p.id}
          product={p}
          addToCart={addToCart}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}
