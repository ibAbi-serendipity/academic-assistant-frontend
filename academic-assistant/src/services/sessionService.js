// MOCKUP: sesiones de chat simuladas.
import {
    delay,
    mockError,
    listSessions,
    getSessionMessages,
    renameSessionById,
    deleteSessionById,
} from '../mocks/mockDb';

export const getSessions = async () => {
    await delay(250);
    return { data: listSessions() };
};

/** @param {number} id_session */
export const getMessagesBySession = async (id_session) => {
    await delay(250);
    const messages = getSessionMessages(id_session);
    if (!messages) throw mockError(404, { detail: 'Sesión no encontrada.' });
    return { data: messages };
};

/**
 * @param {number} id_session
 * @param {string} new_name
 */
export const renameSession = async (id_session, new_name) => {
    await delay(150);
    const result = renameSessionById(id_session, new_name);
    if (!result) throw mockError(404, { detail: 'Sesión no encontrada.' });
    return { data: result };
};

/** @param {number} id_session */
export const deleteSession = async (id_session) => {
    await delay(150);
    if (!deleteSessionById(id_session)) {
        throw mockError(404, { detail: 'Sesión no encontrada.' });
    }
    return { data: null };
};
