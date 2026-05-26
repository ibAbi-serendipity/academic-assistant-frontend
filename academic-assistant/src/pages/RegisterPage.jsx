import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: form.username,
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await res.json();

      console.log("REGISTER:", data);

      if (!res.ok) {
        throw new Error(
          data.detail || "Error al registrar usuario"
        );
      }

      alert("Cuenta creada correctamente");

      navigate("/");

    } catch (error) {
      console.error(error);

      alert(error.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-6">

      <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden">

        <div className="hidden lg:flex flex-col justify-between p-12 bg-primary text-white">
          <h1 className="font-headline text-5xl italic">
            Archivo Académico Inteligente
          </h1>

          <p className="text-lg opacity-80">
            Plataforma con IA para consultas académicas
          </p>
        </div>

        <div className="p-10">

          <h2 className="text-3xl font-headline mb-6">
            Crear cuenta
          </h2>

          <form
            className="space-y-5"
            onSubmit={handleRegister}
          >

            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full p-4 bg-surface-container-highest rounded-xl"
              placeholder="Username"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-4 bg-surface-container-highest rounded-xl"
              placeholder="Correo"
            />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-4 bg-surface-container-highest rounded-xl"
              placeholder="Contraseña"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary text-white rounded-xl disabled:opacity-60"
            >
              {loading ? "Creando..." : "Crear cuenta"}
            </button>

          </form>

          <p className="mt-6 text-sm text-center text-gray-500">
            ¿Ya tienes cuenta?{" "}

            <Link
              to="/"
              className="text-primary font-semibold hover:underline"
            >
              Inicia sesión
            </Link>
          </p>

        </div>
      </div>

    </main>
  );
}