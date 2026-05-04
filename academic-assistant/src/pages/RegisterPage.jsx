import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    console.log("Datos de registro enviados al backend (mock):", {
      name: form.name,
      email: form.email,
      password: form.password,
    });

    navigate("/chat");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-6">

      <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden">

        <div className="hidden lg:flex flex-col justify-between p-12 bg-primary text-white">
          <h1 className="font-headline text-5xl italic">
            Archivo Académico Inteligente
          </h1>
          <p className="text-lg opacity-80">
            Únete a una plataforma diseñada para potenciar tu aprendizaje con inteligencia artificial.
          </p>
          <p className="text-sm opacity-60">
            Comunidad académica global
          </p>
        </div>

        <div className="p-10">
          <h2 className="text-3xl font-headline mb-6">
            Crear cuenta académica
          </h2>

          <form className="space-y-5" onSubmit={handleRegister}>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-4 bg-surface-container-highest rounded-xl"
              placeholder="Nombre completo"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-4 bg-surface-container-highest rounded-xl"
              placeholder="Correo académico"
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
              className="w-full py-4 bg-primary text-white rounded-xl"
            >
              Crear cuenta
            </button>

          </form>

          <p className="mt-6 text-sm text-center text-gray-500">
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/"
              className="text-primary font-semibold hover:underline transition"
            >
              Inicia sesión
            </Link>
          </p>

        </div>
      </div>

    </main>
  );
}