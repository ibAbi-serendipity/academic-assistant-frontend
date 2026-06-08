import api from '../lib/api';

 /**
 * @param {string} question
 * @param {number|null} id_session 
 * @returns {Promise} 
 */
export const sendChatMessage = (question, id_session = null) => {
    return api.post('/chat/', {
        question,
        id_session,
    });
};
