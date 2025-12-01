import React, { useEffect, useState } from "react";

const empty = { title: "", price: "", description: "", category: "", image: "" };

export default function ProductForm({ onSubmit, initialData = null, submitLabel = "Guardar" }) {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        price: initialData.price || "",
        description: initialData.description || "",
        category: initialData.category || "",
        image: initialData.image || ""
      });
    } else setForm(empty);
  }, [initialData]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Nombre obligatorio";
    if (!(parseFloat(form.price) > 0)) e.price = "Precio debe ser mayor a 0";
    if (!form.description || form.description.length < 10) e.description = "Mínimo 10 caracteres";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      onSubmit({ ...form, price: parseFloat(form.price) });
      setForm(empty);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label className="form-label">Nombre</label>
        <input className="form-control" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
        {errors.title && <small className="text-danger">{errors.title}</small>}
      </div>
      <div className="mb-2">
        <label className="form-label">Precio</label>
        <input type="number" step="0.01" className="form-control" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
        {errors.price && <small className="text-danger">{errors.price}</small>}
      </div>
      <div className="mb-2">
        <label className="form-label">Descripción</label>
        <textarea className="form-control" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
        {errors.description && <small className="text-danger">{errors.description}</small>}
      </div>
      <div className="mb-2">
        <label className="form-label">Categoría</label>
        <input className="form-control" value={form.category} onChange={e => setForm({...form, category: e.target.value})} />
      </div>
      <div className="mb-2">
        <label className="form-label">Imagen (URL)</label>
        <input className="form-control" value={form.image} onChange={e => setForm({...form, image: e.target.value})} />
      </div>
      <button className="btn btn-primary" type="submit">{submitLabel}</button>
    </form>
  );
}
