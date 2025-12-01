import React from "react";
import { useCart } from "../contexts/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQty, total, clearCart } = useCart();

  return (
    <section>
      <h2>Carrito</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div className="cart-card">
          <ul className="list-unstyled">
            {cart.map((p, i) => (
              <li key={i} className="d-flex justify-content-between align-items-center mb-2">
                <div style={{maxWidth: "70%"}}>
                  <strong>{p.title}</strong>
                  <div>${p.price} x {p.qty || 1}</div>
                </div>
                <div>
                  <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => updateQty(p.id, (p.qty||1) - 1)}>-</button>
                  <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => updateQty(p.id, (p.qty||1) + 1)}>+</button>
                  <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(i)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <strong>Total: ${total.toFixed(2)}</strong>
            <div>
              <button className="btn btn-secondary me-2" onClick={clearCart}>Vaciar</button>
              <button className="btn btn-primary">Finalizar compra</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
