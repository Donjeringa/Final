import { useState } from "react";
import { createProduct } from "../services/productsService";
import { useNavigate } from "react-router-dom";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      await createProduct({
        name,
        price: parseFloat(price),
        description,
      });
      navigate("/products");
    } catch (err) {
      setError("Error al crear producto");
    }
  }

  return (
    <div className="container mt-4">
      <h2>Agregar Producto</h2>

      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          className="form-control mb-2"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <textarea
          className="form-control mb-2"
          placeholder="Descripción (mínimo 10 caracteres)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="btn btn-primary">Crear</button>
      </form>
    </div>
  );
}
