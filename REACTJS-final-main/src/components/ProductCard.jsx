import React from "react";

export default function ProductCard({ product, addToCart, onEdit, onDelete }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.title} />
      <h5>{product.title}</h5>
      <p style={{ minHeight: 48 }}>{product.description?.slice(0, 80)}{product.description && product.description.length > 80 ? '...' : ''}</p>
      <div className="d-flex justify-content-between align-items-center">
        <strong>${product.price}</strong>
        <div>
          {addToCart && <button className="btn btn-sm btn-primary me-2" onClick={() => addToCart(product)}>Agregar</button>}
          {onEdit && <button className="btn btn-sm btn-secondary me-2" onClick={() => onEdit(product)}>Editar</button>}
          {onDelete && <button className="btn btn-sm btn-danger" onClick={() => onDelete(product)}>Eliminar</button>}
        </div>
      </div>
    </article>
  );
}

