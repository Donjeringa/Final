import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsList from "./pages/ProductsList";
import ProductForm from "./pages/ProductForm";
import ProductEdit from "./pages/ProductEdit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/new" element={<ProductForm />} />
        <Route path="/products/edit/:id" element={<ProductEdit />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={2500} />
    </BrowserRouter>
  );
}

export default App;
