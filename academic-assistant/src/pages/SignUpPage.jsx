import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function SignUpPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        setLoading(true);

        try {
            await register({ username, email, password });
            navigate('/');
        } catch (err) {
            const data = err.response?.data;
            const message =
                data?.message ||
                data?.email?.[0] ||
                data?.username?.[0] ||
                data?.password?.[0] ||
                'Error al registrar usuario';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-background p-6">
            <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="hidden lg:flex flex-col justify-between p-12 bg-primary text-white">
                    <div>
                        <h1 className="font-headline text-5xl italic">
                            Archivo Académico Inteligente
                        </h1>
                        <p className="mt-8 text-lg opacity-80">
                            Plataforma con IA para consultas académicas.
                        </p>
                    </div>
                </div>

                <div className="p-10">
                    <h2 className="text-3xl font-headline mb-6">
                        Crear cuenta
                    </h2>

                    {error && (
                        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full p-4 bg-surface-container-highest rounded-xl"
                            placeholder="Usuario"
                        />

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-4 bg-surface-container-highest rounded-xl"
                            placeholder="Correo"
                        />

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-4 bg-surface-container-highest rounded-xl"
                            placeholder="Contraseña"
                        />

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full p-4 bg-surface-container-highest rounded-xl"
                            placeholder="Confirmar contraseña"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-primary text-white rounded-xl disabled:opacity-60"
                        >
                            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-center text-gray-500">
                        ¿Ya tienes cuenta?{' '}
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
