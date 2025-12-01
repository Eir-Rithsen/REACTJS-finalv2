import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components"; // Importamos styled-components
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { FaShoppingCart, FaUser } from "react-icons/fa";


const NavContainer = styled.nav`
  background: #111;
  color: #fff;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    color: #fff;
    text-decoration: none;
    margin-right: 1rem;
    transition: color 0.3s;
    
    &:hover {
      color: #0077ff; /* Color primario al pasar el mouse */
    }
    
    &.active {
      font-weight: bold;
      color: #0077ff;
    }
  }
`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <NavContainer>
      <div className="d-flex align-items-center">
        <Link to="/" className="navbar-brand text-white" style={{ fontWeight: 700, fontSize: '1.25rem' }}>
          E-Commerce
        </Link>
      </div>
      <div>
        <NavLink to="/productos">Productos</NavLink>
        
        <NavLink to="/carrito">
          <FaShoppingCart /> <span className="badge bg-primary ms-1">{cart.length}</span>
        </NavLink>
        
        {/* Enlace Admin visible solo si hay usuario, o público según se elija, pero protegido por ruta */}
        <NavLink to="/admin">Admin</NavLink>

        {user ? (
          <>
            <span className="me-3 text-white-50"><FaUser /> {user.name}</span>
            <button className="btn btn-sm btn-outline-light" onClick={logout}>Logout</button>
          </>
        ) : (
          <NavLink to="/login" className="btn btn-sm btn-light text-dark">Login</NavLink>
        )}
      </div>
    </NavContainer>
  );
}
