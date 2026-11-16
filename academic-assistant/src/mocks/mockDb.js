// "Base de datos" simulada en memoria, persistida en localStorage para que
// los cambios (chats, renombrados, usuarios) sobrevivan a recargar la página.
// No realiza ninguna petición de red.

import {
    DEMO_USER,
    MOCK_DOCUMENTS,
    MOCK_KNOWLEDGE,
    MOCK_FALLBACK,
    SEED_SESSIONS,
} from './mockData';

const STORAGE_KEY = 'mock_academic_assistant_db';

const clone = (value) => JSON.parse(JSON.stringify(value));

const loadDb = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch {
        // ignorar y reiniciar con datos semilla
    }
    return {
        users: [DEMO_USER],
        sessions: clone(SEED_SESSIONS),
        nextSessionId: SEED_SESSIONS.length + 1,
    };
};

let db = loadDb();

const persist = () => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    } catch {
        // si falla el almacenamiento, el mock sigue funcionando en memoria
    }
};

// Simula la latencia de red.
export const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

// Imita la forma de error de axios: err.response.data / err.response.status
export const mockError = (status, data) => {
    const err = new Error(data?.detail || data?.message || 'Error simulado');
    err.response = { status, data };
    return err;
};

// ---------- Usuarios ----------

export const findUser = (username) =>
    db.users.find((u) => u.username.toLowerCase() === String(username).toLowerCase());

export const addUser = ({ username, email }) => {
    const user = { id: db.users.length + 1, username, email };
    db.users.push(user);
    persist();
    return user;
};

// ---------- Documentos ----------

export const listDocuments = () => clone(MOCK_DOCUMENTS);

// ---------- Sesiones ----------

export const listSessions = () =>
    clone(db.sessions)
        .map(({ id, chat_name, created_at }) => ({ id, chat_name, created_at }))
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

export const getSession = (id) => db.sessions.find((s) => s.id === Number(id));

export const getSessionMessages = (id) => {
    const session = getSession(id);
    return session ? clone(session.messages) : null;
};

export const renameSessionById = (id, newName) => {
    const session = getSession(id);
    if (!session) return null;
    session.chat_name = newName;
    persist();
    return { id: session.id, chat_name: session.chat_name };
};

export const deleteSessionById = (id) => {
    const before = db.sessions.length;
    db.sessions = db.sessions.filter((s) => s.id !== Number(id));
    persist();
    return db.sessions.length < before;
};

// ---------- Chat ----------

const generateReply = (question) => {
    const q = question.toLowerCase();
    const match = MOCK_KNOWLEDGE.find((entry) =>
        entry.keywords.some((k) => q.includes(k))
    );
    return clone(match ?? MOCK_FALLBACK);
};

const makeTitle = (question) => {
    const clean = question.trim().replace(/\s+/g, ' ');
    return clean.length > 40 ? `${clean.slice(0, 40)}…` : clean;
};

export const addChatExchange = (question, idSession = null) => {
    let session = idSession != null ? getSession(idSession) : null;

    if (!session) {
        session = {
            id: db.nextSessionId++,
            chat_name: makeTitle(question),
            created_at: new Date().toISOString(),
            messages: [],
        };
        db.sessions.push(session);
    }

    const { answer, sources } = generateReply(question);
    session.messages.push({
        id: `m-${session.id}-${session.messages.length + 1}-${Date.now()}`,
        question,
        answer,
        sources,
        created_at: new Date().toISOString(),
    });
    persist();

    return { id_session: session.id, question, answer, sources };
};

// Útil durante el desarrollo: restablece los datos de ejemplo.
export const resetMockDb = () => {
    localStorage.removeItem(STORAGE_KEY);
    db = loadDb();
};
