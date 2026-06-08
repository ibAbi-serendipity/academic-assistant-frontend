import api from '../lib/api';

export const getSessions = () => {
    return api.get('/sessions/');
};

/**
 * @param {number} id_session 
 */
export const getMessagesBySession = (id_session) => {
    return api.get(`/sessions/${id_session}/messages/`);
};

/**
 * @param {number} id_session
 * @param {string} new_name 
 */
export const renameSession = (id_session, new_name) => {
    return api.patch(`/sessions/${id_session}/`, {
        new_name,
    });
};

/**
 * Eliminar una sesión de chat
 * @param {number} id_session 
 */
export const deleteSession = (id_session) => {
    return api.delete(`/sessions/${id_session}/`);
};
