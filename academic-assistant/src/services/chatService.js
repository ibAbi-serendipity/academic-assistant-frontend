// MOCKUP: respuestas simuladas del asistente (sin backend ni IA real).
import { delay, addChatExchange } from '../mocks/mockDb';

/**
 * @param {string} question
 * @param {number|null} id_session
 */
export const sendChatMessage = async (question, id_session = null) => {
    await delay(900); // simula el tiempo de "pensar"
    return { data: addChatExchange(question, id_session) };
};
