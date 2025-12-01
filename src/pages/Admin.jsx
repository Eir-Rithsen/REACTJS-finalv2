import React, { useState } from "react";
import { useProducts } from "../contexts/ProductsContext";
import ProductForm from "../components/ProductForm";
import ProductCard from "../components/ProductCard";
import ConfirmModal from "../components/ConfirmModal";
import { Helmet } from "react-helmet";

export default function Admin() {
  const { products, createProduct, updateProduct, deleteProduct } = useProducts();
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState({ show: false, product: null });

  const handleSubmitCreate = async (payload) => {
    await createProduct(payload);
  };

  const handleEdit = (product) => setEditing(product);
  const handleSubmitEdit = async (payload) => {
    if (!editing) return;
    await updateProduct(editing.id, payload);
    setEditing(null);
  };

  const handleDelete = (product) => setConfirm({ show: true, product });
  const confirmDelete = async () => {
    await deleteProduct(confirm.product.id);
    setConfirm({ show: false, product: null });
  };

  return (
    <section>
      <Helmet>
        <title>Admin - Productos</title>
      </Helmet>

      <h2>Admin - Productos</h2>

      <div className="row">
        <div className="col-md-5">
          <h4>{editing ? "Editar Producto" : "Crear Producto"}</h4>
          <ProductForm onSubmit={editing ? handleSubmitEdit : handleSubmitCreate} initialData={editing} submitLabel={editing ? "Guardar cambios" : "Crear"} />
          {editing && <button className="btn btn-sm btn-secondary mt-2" onClick={() => setEditing(null)}>Cancelar edición</button>}
        </div>

        <div className="col-md-7">
          <h4>Listado</h4>
          <div className="product-list">
            {products.map(p => (
              <ProductCard key={p.id} product={p} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      </div>

      <ConfirmModal
        show={confirm.show}
        title="Eliminar producto"
        message={`¿Querés eliminar "${confirm.product?.title}"?`}
        onCancel={() => setConfirm({ show: false, product: null })}
        onConfirm={confirmDelete}
      />
    </section>
  );
}
