import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
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

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: form.username,
            password: form.password,
          }),
        }
      );

      const data = await res.json();

      console.log("LOGIN:", data);

      if (!res.ok) {
        throw new Error(
          data.detail || "Credenciales incorrectas"
        );
      }

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      localStorage.setItem(
        "user",
        JSON.stringify({
          username: form.username,
          email: data.email || form.username + "@gmail.com",
        })
      );

      navigate("/chat");

    } catch (error) {
      console.error(error);

      alert(error.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen">

      <section className="hidden lg:flex lg:w-7/12 relative items-center justify-center bg-surface-container-low overflow-hidden">

        <div className="absolute inset-0 opacity-40">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlI1E5NP20_PJAyagvVYXxAw1z1mVhMFL08jR9WpM9VLVP8vTL-CwAr021nrsHFKYARkRlumIMv_6OUjWsp3oStyldF7dUOmZ3AMkykdG8lqeH0kPnniJ56oGqmjbRgi6kQM0gBzo6Jnd6AjX2wwS9EmZEeLKIArBunLtaurITCT7TvimjUqCw0cq7wKN1xRgJeCXiywzR4pu4aK7EMe6uTFnNhsaUX2z0dCp3rEvd47j8X7cecUYSXw0SyybfEU57WWRBucsbWGk"
          />
        </div>

        <div className="relative z-10 p-16 max-w-2xl">

          <h1 className="font-headline italic text-7xl text-primary mb-6">
            Archivo Académico Inteligente
          </h1>

          <p className="text-xl text-primary-container">
            Donde el conocimiento se encuentra con la inteligencia artificial.
          </p>

        </div>

      </section>

      <section className="w-full lg:w-5/12 flex flex-col justify-center bg-white px-8 lg:px-24">

        <h2 className="font-headline text-4xl mb-6">
          Iniciar sesión
        </h2>

        <form
          className="space-y-6"
          onSubmit={handleLogin}
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
            {loading ? "Entrando..." : "Iniciar sesión"}
          </button>

        </form>

        <p className="mt-6 text-sm text-center text-gray-500">
          ¿No tienes cuenta?{" "}

          <Link
            to="/register"
            className="text-primary font-semibold hover:underline"
          >
            Crear cuenta
          </Link>
        </p>

      </section>

    </main>
  );
}