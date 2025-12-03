import { useEffect, useState } from "react";
import {
  getProducts,
  deleteProduct,
} from "../services/productsService";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [productToDelete, setProductToDelete] = useState(null);

  // 🔍 Búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // 📄 Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError("Error al cargar productos");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function confirmDelete(product) {
    setProductToDelete(product);
  }

  async function handleDelete() {
    if (!productToDelete) return;
    try {
      await deleteProduct(productToDelete.id);
      setProducts((prev) =>
        prev.filter((p) => p.id !== productToDelete.id)
      );
    } catch (err) {
      setError("Error al eliminar el producto");
    } finally {
      setProductToDelete(null);
    }
  }

  // 🔍 Filtrado por búsqueda
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 📄 Lógica de paginado
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <Helmet>
        <title>Productos — Gestión</title>
      </Helmet>

      <h2 className="mb-3">Productos</h2>

      {/* 🔍 BUSCADOR */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />

      {/* BOTÓN AGREGAR */}
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/products/new")}
      >
        Agregar Producto
      </button>

      {filteredProducts.length === 0 ? (
        <p>No hay productos que coincidan con la búsqueda.</p>
      ) : (
        <ul className="list-group">
          {paginatedProducts.map((p) => (
            <li
              key={p.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{p.name}</strong> — ${p.price}
              </div>

              <div>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/products/edit/${p.id}`)}
                >
                  Editar
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                  onClick={() => confirmDelete(p)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* 📄 PAGINADOR Bootstrap */}
      {totalPages > 1 && (
        <nav className="mt-3">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Anterior
              </button>
            </li>

            {Array.from({ length: totalPages }).map((_, i) => (
              <li
                key={i}
                className={`page-item ${
                  currentPage === i + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Siguiente
              </button>
            </li>
          </ul>
        </nav>
      )}

      {/* MODAL DE ELIMINACIÓN */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deleteModalLabel">
                Confirmar eliminación
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              ¿Seguro que querés eliminar{" "}
              <strong>{productToDelete?.name}</strong>?
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
                data-bs-dismiss="modal"
              >
                Eliminar
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}