import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await login(username, password);
            navigate('/chat');
        } catch (err) {
            setError(err.response?.data?.detail || 'Error al iniciar sesión');
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

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-4 mb-6">
                        {error}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full p-4 bg-surface-container-highest rounded-xl"
                        placeholder="Username"
                    />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-4 bg-surface-container-highest rounded-xl"
                        placeholder="Contraseña"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-primary text-white rounded-xl disabled:opacity-60"
                    >
                        {loading ? 'Entrando...' : 'Iniciar sesión'}
                    </button>
                </form>

                <p className="mt-6 text-sm text-center text-gray-500">
                    ¿No tienes cuenta?{' '}
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