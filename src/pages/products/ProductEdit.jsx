import { useEffect, useState } from "react";
import {
  getProductById,
  updateProduct,
} from "../../services/productsService";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getProductById(id);
        setName(data.name);
        setPrice(data.price);
        setDescription(data.description);
      } catch (err) {
        setError("Error al cargar producto");
      }
    }
    load();
  }, [id]);

  function validate() {
    if (!name.trim()) return "El nombre es obligatorio";
    if (price <= 0) return "El precio debe ser mayor a 0";
    if (description.length < 10)
      return "La descripción debe tener mínimo 10 caracteres";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await updateProduct(id, {
        name,
        price: parseFloat(price),
        description,
      });
      navigate("/products");
    } catch (err) {
      setError("Error al actualizar el producto");
    }
  }

  return (
    <div className="container mt-4">
      <h2>Editar Producto</h2>

      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          className="form-control mb-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <textarea
          className="form-control mb-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="btn btn-primary">Guardar Cambios</button>
      </form>
    </div>
  );
}
