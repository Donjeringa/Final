const API_BASE = "https://69092b0f2d902d0651b2dfd1.mockapi.io/Productos";

const api = axios.create({
  baseURL: API_BASE,
});

export async function getProducts() {
  const { data } = await api.get("/products");
  return data;
}

export async function getProductById(id) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}

export async function createProduct(product) {
  const { data } = await api.post("/products", product);
  return data;
}

export async function updateProduct(id, product) {
  const { data } = await api.put(`/products/${id}`, product);
  return data;
}

export async function deleteProduct(id) {
  const { data } = await api.delete(`/products/${id}`);
  return data;
}
