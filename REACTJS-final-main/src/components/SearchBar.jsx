import React from "react";

export default function SearchBar({ value, onChange, placeholder = "Buscar..." }) {
  return (
    <input
      aria-label="Buscar productos"
      className="form-control"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}
