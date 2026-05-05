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
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const fakeLogin = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (form.username === "test" && form.password === "1234") {
          resolve({
            access: "fake-access-token",
            refresh: "fake-refresh-token",
          });
        } else {
          reject("Credenciales incorrectas");
        }
      }, 800);
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await fakeLogin();

      console.log("LOGIN MOCK:", data);

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      navigate("/chat");

    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen">

      <section className="w-full lg:w-5/12 flex flex-col justify-center bg-white px-8 lg:px-24">

        <h2 className="font-headline text-4xl mb-6">
          Iniciar sesión
        </h2>

        <form className="space-y-6" onSubmit={handleLogin}>

          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-4 bg-surface-container-highest rounded-xl"
            placeholder="Username"
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-4 bg-surface-container-highest rounded-xl"
            placeholder="Contraseña"
          />

          <button
            disabled={loading}
            className="w-full py-4 bg-primary text-white rounded-xl"
          >
            {loading ? "Entrando..." : "Iniciar sesión"}
          </button>

        </form>

        <p className="mt-6 text-sm text-center text-gray-500">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-primary font-semibold">
            Crear cuenta
          </Link>
        </p>
      </section>
    </main>
  );
}