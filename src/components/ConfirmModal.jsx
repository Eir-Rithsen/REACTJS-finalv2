import React from "react";

export default function ConfirmModal({ show, title = "Confirmar", message, onCancel, onConfirm }) {
  if (!show) return null;
  return (
    <div className="modal-backdrop-custom" role="dialog" aria-modal="true">
      <div className="modal-content-custom">
        <h5>{title}</h5>
        <p>{message}</p>
        <div className="d-flex justify-content-end">
          <button className="btn btn-secondary me-2" onClick={onCancel}>Cancelar</button>
          <button className="btn btn-danger" onClick={onConfirm}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}
