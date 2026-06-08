import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import * as chatService from '../services/chatService';
import * as sessionService from '../services/sessionService';
import { useAuth } from './AuthContext';

const SessionContext = createContext();

export const useSession = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSession debe ser usado dentro de SessionProvider');
    }
    return context;
};

export const SessionProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();

    const [currentSessionId, setCurrentSessionId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSessions = useCallback(async () => {
        if (!isAuthenticated) return;
        setLoading(true);
        try {
            const response = await sessionService.getSessions();
            setSessions(response.data);
        } catch (err) {
            console.error('Error obteniendo sesiones:', err);
            setError('Error al obtener sesiones');
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated]);

    const normalizeMessage = (msg) => {
        const roleRaw = msg.role ?? msg.sender ?? msg.user ?? msg.author ?? msg.type ?? msg.role_name ?? 'assistant';
        const roleKey = String(roleRaw).toLowerCase();
        const role = ['user', 'usuario', 'person', 'human', 'cliente'].includes(roleKey)
            ? 'user'
            : 'assistant';

        const text =
            msg.content ??
            msg.answer ??
            msg.message ??
            msg.text ??
            msg.body ??
            msg.reply ??
            msg.response ??
            '';

        const sourcesRaw = msg.sources ?? msg.citations ?? msg.references ?? msg.refs ?? msg.metadata?.sources ?? [];
        const sources = Array.isArray(sourcesRaw) ? sourcesRaw : [sourcesRaw];

        return {
            id: msg.id ?? msg.pk ?? `${role}-${Date.now()}-${Math.random()}`,
            content: String(text),
            role,
            sources,
            created_at: msg.created_at ?? msg.createdAt ?? msg.timestamp ?? new Date().toISOString(),
            pending: msg.pending ?? false,
        };
    };

    const createMessage = ({ role, content, sources = [] }) => ({
        id: `${role}-${Date.now()}-${Math.random()}`,
        role,
        content: String(content ?? ''),
        sources: Array.isArray(sources) ? sources : [sources],
        created_at: new Date().toISOString(),
        pending: false,
    });

    const normalizeMessageOrPair = (msg) => {
        if (msg && (msg.question !== undefined || msg.answer !== undefined)) {
            const questionText = msg.question ?? '';
            const answerText = msg.answer ?? '';
            const sourcesRaw = msg.sources ?? msg.citations ?? msg.references ?? msg.refs ?? msg.metadata?.sources ?? [];
            const sources = Array.isArray(sourcesRaw) ? sourcesRaw : [sourcesRaw];

            return [
                createMessage({
                    role: 'user',
                    content: questionText,
                }),
                createMessage({
                    role: 'assistant',
                    content: answerText,
                    sources,
                }),
            ];
        }

        return [normalizeMessage(msg)];
    };

    const getMessagesFromResponse = (data) => {
        if (Array.isArray(data)) return data;
        if (data?.messages && Array.isArray(data.messages)) return data.messages;
        if (data?.results && Array.isArray(data.results)) return data.results;
        if (data?.data && Array.isArray(data.data)) return data.data;
        return [];
    };

    const pendingResponseRef = useRef(false);

    const fetchMessagesBySession = useCallback(async (sessionId) => {
        setLoading(true);
        try {
            const response = await sessionService.getMessagesBySession(sessionId);
            console.debug('fetchMessagesBySession response.data:', response.data);
            const rawMessages = getMessagesFromResponse(response.data);
            const normalizedMessages = rawMessages.flatMap(normalizeMessageOrPair);
            console.debug('fetchMessagesBySession normalizedMessages:', normalizedMessages);
            // If we have a pending response being revealed locally, don't overwrite it
            if (pendingResponseRef.current) {
                setLoading(false);
                return;
            }
            setMessages(normalizedMessages);
            setError(null);
        } catch (err) {
            console.error('Error obteniendo mensajes:', err);
            setError('Error al obtener mensajes');
            setMessages([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const switchSession = useCallback(
        async (sessionId) => {
            setCurrentSessionId(sessionId);
            await fetchMessagesBySession(sessionId);
        },
        [fetchMessagesBySession]
    );

    const typingTimeouts = useRef([]);

    useEffect(() => {
        return () => {
            typingTimeouts.current.forEach(clearTimeout);
            typingTimeouts.current = [];
        };
    }, []);

    const sendMessage = useCallback(
        async (question) => {
            setLoading(true);

            const pendingId = `assistant-pending-${Date.now()}-${Math.random()}`;
            const userMessage = createMessage({
                role: 'user',
                content: question,
            });
            const assistantMessage = {
                id: pendingId,
                role: 'assistant',
                content: '',
                sources: [],
                pending: true,
            };

            setMessages((prev) => [...prev, userMessage, assistantMessage]);
            pendingResponseRef.current = true;

            try {
                const response = await chatService.sendChatMessage(question, currentSessionId);
                const { id_session, question: respQuestion, answer, sources } = response.data;
                const userQuestion = respQuestion ?? question;
                const fullAnswer =
                    answer ??
                    response.data.content ??
                    response.data.message ??
                    response.data.text ??
                    'No se recibió respuesta';
                const normalizedSources = sources ?? [];

                if (id_session && id_session !== currentSessionId) {
                    setCurrentSessionId(id_session);
                    await fetchSessions();
                }

                const reveal = (index = 1) => {
                    setMessages((prev) =>
                        prev.map((msg) =>
                            msg.id === pendingId
                                ? {
                                      ...msg,
                                      content: fullAnswer.slice(0, index),
                                      sources: normalizedSources,
                                      pending: index < fullAnswer.length,
                                  }
                                : msg
                        )
                    );

                    if (index < fullAnswer.length) {
                        const timeout = setTimeout(() => reveal(index + 1), 25);
                        typingTimeouts.current.push(timeout);
                    } else {
                        // finished revealing
                        const finalize = setTimeout(() => {
                            pendingResponseRef.current = false;
                            if (id_session) {
                                fetchMessagesBySession(id_session).catch(() => {});
                            }
                        }, 0);
                        typingTimeouts.current.push(finalize);
                    }
                };

                const initialDelay = setTimeout(() => reveal(), 120);
                typingTimeouts.current.push(initialDelay);

                setError(null);
                return response.data;
            } catch (err) {
                console.error('Error enviando mensaje:', err);
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === pendingId
                            ? {
                                  ...msg,
                                  content: 'Error al conectar con el servidor',
                                  pending: false,
                              }
                            : msg
                    )
                );
                setError('Error al enviar mensaje');
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [currentSessionId, fetchSessions]
    );

    const createNewSession = useCallback(async () => {
        try {
            setCurrentSessionId(null);
            setMessages([]);
            setError(null);
            await fetchSessions();
        } catch (err) {
            console.error('Error creando sesión:', err);
            setError('Error al crear sesión');
        }
    }, [fetchSessions]);

    const clearCurrentSession = useCallback(() => {
        setCurrentSessionId(null);
        setMessages([]);
        setError(null);
    }, []);

    const renameSession = useCallback(
        async (sessionId, newName) => {
            try {
                await sessionService.renameSession(sessionId, newName);
                setSessions((prev) =>
                    prev.map((s) =>
                        s.id === sessionId ? { ...s, chat_name: newName } : s
                    )
                );
                setError(null);
            } catch (err) {
                console.error('Error renombrando sesión:', err);
                setError('Error al renombrar sesión');
                throw err;
            }
        },
        []
    );

    const deleteSession = useCallback(
        async (sessionId) => {
            try {
                await sessionService.deleteSession(sessionId);
                setSessions((prev) => prev.filter((s) => s.id !== sessionId));

                if (currentSessionId === sessionId) {
                    setCurrentSessionId(null);
                    setMessages([]);
                }

                setError(null);
            } catch (err) {
                console.error('Error eliminando sesión:', err);
                setError('Error al eliminar sesión');
                throw err;
            }
        },
        [currentSessionId]
    );

    useEffect(() => {
        if (isAuthenticated) {
            fetchSessions();
        } else {
            setSessions([]);
            setMessages([]);
            setCurrentSessionId(null);
        }
    }, [isAuthenticated, fetchSessions]);

    const value = {
        currentSessionId,
        messages,
        sessions,
        loading,
        error,

        switchSession,
        sendMessage,
        createNewSession,
        clearCurrentSession,
        renameSession,
        deleteSession,
        fetchSessions,
        fetchMessagesBySession,
    };

    return (
        <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
    );
};
