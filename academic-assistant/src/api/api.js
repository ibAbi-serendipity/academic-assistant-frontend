const API_URL = "http://127.0.0.1:8000/api";

export async function apiFetch(
  endpoint,
  options = {}
) {

  const token = localStorage.getItem("access");

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      headers: {
        "Content-Type": "application/json",

        ...(token && {
          Authorization: `Bearer ${token}`,
        }),

        ...(options.headers || {}),
      },

      ...options,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
      data.error ||
      "Error en la petición"
    );
  }

  return data;
}