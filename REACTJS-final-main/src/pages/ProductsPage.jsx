import React, { useMemo, useState } from "react";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { useProducts } from "../contexts/ProductsContext";

export default function ProductsPage() {
  const { products, loading } = useProducts();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const filtered = useMemo(() => {
    return products.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(search.toLowerCase()))
    );
  }, [products, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const pageItems = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <>
      <h2>Productos</h2>
      <div className="mb-3 row">
        <div className="col-md-6">
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} />
        </div>
      </div>

      <ProductList search={search} pageItems={pageItems} />

      <div className="mt-3 d-flex justify-content-center">
        <Pagination page={page} totalPages={totalPages} onChange={(p) => setPage(p)} />
      </div>
    </>
  );
}
