// MOCKUP: simula la autenticación sin backend.
// Cualquier usuario/contraseña no vacíos permite iniciar sesión.
import { delay, mockError, findUser, addUser } from '../mocks/mockDb';

const TOKEN_PREFIX = 'mock-token-';

export const registerUser = async (userData) => {
    await delay();
    const { username, email } = userData;

    if (findUser(username)) {
        throw mockError(400, { username: ['Este nombre de usuario ya existe.'] });
    }

    const user = addUser({ username, email });
    return { data: user };
};

export const loginUser = async (credentials) => {
    await delay();
    const { username, password } = credentials;

    if (!username || !password) {
        throw mockError(401, { detail: 'Credenciales inválidas.' });
    }

    // Si el usuario no existe, se crea al vuelo para que el mockup sea navegable.
    if (!findUser(username)) {
        addUser({ username, email: `${username}@unmsm.edu.pe` });
    }

    return {
        data: {
            access: `${TOKEN_PREFIX}${username}`,
            refresh: `${TOKEN_PREFIX}refresh-${username}`,
        },
    };
};

export const refreshAccessToken = async (refreshToken) => {
    await delay(100);
    return { data: { access: refreshToken.replace('refresh-', '') } };
};

export const getUserInfo = async () => {
    await delay(150);
    const token = localStorage.getItem('access_token') || '';
    const username = token.startsWith(TOKEN_PREFIX) ? token.slice(TOKEN_PREFIX.length) : null;
    const user = username && findUser(username);

    if (!user) {
        throw mockError(401, { detail: 'No autenticado.' });
    }

    return { data: user };
};

export const logoutUser = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};
