import React from "react";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <section>
      <Helmet>
        <title>Tienda - Home</title>
        <meta name="description" content="Tienda de ejemplo - Preentrega" />
      </Helmet>
      <h1>Bienvenido a la Tienda</h1>
      <p>Usa el menú para explorar productos, ver el carrito o ingresar al admin.</p>
    </section>
  );
}
