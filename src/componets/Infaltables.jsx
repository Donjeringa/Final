import React from 'react';
import ProductList from './ListaProductos';

const Infaltables = () => {
  return (
    <div className="container">
      <h1>Infaltables</h1>
      <ProductList category="jewelery" />
    </div>
  );
};

export default Infaltables;