import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleQuickLogin = async () => {
    await login("demo@user.com");
    navigate("/");
  };

  return (
    <section>
      <h2>Login</h2>
      <p>Login simulado para la entrega (no uses credenciales reales).</p>
      <button className="btn btn-primary" onClick={handleQuickLogin}>Login rápido</button>
    </section>
  );
}
