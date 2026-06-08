import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatHeader from '../components/ChatHeader';
import ChatSidebar from '../components/ChatSidebar';
import ChatMain from '../components/ChatMain';
import { useSession } from '../contexts/SessionContext';

export default function SessionPage() {
    const { sessionId } = useParams();
    const navigate = useNavigate();
    const {
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
    } = useSession();

    const [localError, setLocalError] = useState('');
    const [sendingMessage, setSendingMessage] = useState(false);
    console.log(sendMessage)
    console.log(messages);

    useEffect(() => {
        if (sessionId) {
            const numericId = Number(sessionId);
            if (!Number.isNaN(numericId)) {
                switchSession(numericId).catch(() => {
                    setLocalError('No se pudo cargar la sesión solicitada.');
                });
            }
        } else {
            clearCurrentSession();
        }
    }, [sessionId, switchSession, clearCurrentSession]);

    const handleNewChat = () => {
        createNewSession();
        navigate('/chat');
    };

    const handleLoadChat = (entry) => {
        navigate(`/chat/${entry.id}`);
    };

    const handleDeleteChat = async (id) => {
        try {
            await deleteSession(id);
            if (currentSessionId === id) {
                navigate('/chat');
            }
        } catch (err) {
            setLocalError('No se pudo eliminar la sesión.');
        }
    };

    const handleRenameChat = async (id, newTitle) => {
        try {
            await renameSession(id, newTitle);
        } catch (err) {
            setLocalError('No se pudo renombrar la sesión.');
        }
    };

    const handleSend = async (question) => {
        setLocalError('');
        setSendingMessage(true);

        try {
            const response = await sendMessage(question);

            if (response?.id_session && response.id_session !== currentSessionId) {
                navigate(`/chat/${response.id_session}`, { replace: true });
            }
        } catch (err) {
            setLocalError('Error al enviar la pregunta.');
        } finally {
            setSendingMessage(false);
        }
    };

    const chatHistory = sessions.map((session) => ({
        id: session.id,
        title: session.chat_name || `Chat ${session.id}`,
    }));

    return (
        <main className="flex min-h-screen bg-slate-50">
            <ChatSidebar
                chatHistory={chatHistory}
                activeChatId={currentSessionId}
                onNuevaConsulta={handleNewChat}
                onLoadChat={handleLoadChat}
                onDeleteChat={handleDeleteChat}
                onRenameChat={handleRenameChat}
            />

            <section className="flex-1 flex flex-col ml-80 min-h-screen">
                {error || localError ? (
                    <div className="p-6 bg-red-50 text-red-700 border-b border-red-200">
                        {error || localError}
                    </div>
                    ) : null
                }

                {loading && !sendingMessage ? (
                    <div className="flex-1 flex items-center justify-center text-slate-500">
                        Cargando sesión...
                    </div>
                    ) : (
                    <ChatMain
                        activeSection="nueva-consulta"
                        messages={messages}
                        onSend={handleSend}
                        isSending={sendingMessage}
                    />
                )}
            </section>
        </main>
    );
}
