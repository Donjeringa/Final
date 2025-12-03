import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    login(username);
    navigate("/");
  }

  return (
    <div className="container mt-4">
      <h2>Iniciar Sesión</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-control mb-2"
        />

        <button className="btn btn-primary" type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}
