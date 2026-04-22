import { Link, useNavigate } from "react-router-dom";
export default function RegisterPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
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
              className="w-full p-4 bg-surface-container-highest rounded-xl"
              placeholder="Nombre completo"
            />

            <input
              type="email"
              className="w-full p-4 bg-surface-container-highest rounded-xl"
              placeholder="Correo académico"
            />

            <input
              type="password"
              className="w-full p-4 bg-surface-container-highest rounded-xl"
              placeholder="Contraseña"
            />

            <button className="w-full py-4 bg-primary text-white rounded-xl">
              Crear cuenta
            </button>

          </form>

          <p className="mt-6 text-sm text-center text-gray-500">
            ¿Ya tienes cuenta?{""}
            <Link 
              to="/login" 
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