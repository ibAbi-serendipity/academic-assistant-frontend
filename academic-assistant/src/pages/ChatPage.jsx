import { useState } from "react";
import ChatHeader from "../components/ChatHeader";
import ChatSidebar from "../components/ChatSidebar";
import ChatMain from "../components/ChatMain";

// genera título automático del chat
function generateChatTitle(messages) {
  const firstUser = messages.find((m) => m.role === "user");
  if (!firstUser) return "Chat sin título";

  const words = firstUser.content.trim().split(" ").slice(0, 5).join(" ");
  return words.length < firstUser.content.length ? `${words}…` : words;
}

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [activeSection, setActiveSection] = useState("nueva-consulta");

  // crear nuevo chat
  const handleNuevaConsulta = () => {
    if (messages.length > 0) {
      const newEntry = {
        id: Date.now(),
        title: generateChatTitle(messages),
        messages: [...messages],
      };

      setChatHistory((prev) => [newEntry, ...prev]);
    }

    setMessages([]);
    setActiveChatId(null);
    setActiveSection("nueva-consulta");
  };

  // cargar chat del historial
  const handleLoadChat = (entry) => {
    if (messages.length > 0 && activeChatId !== entry.id) {
      const exists = chatHistory.find((c) => c.id === activeChatId);
      if (!exists) {
        const newEntry = {
          id: Date.now(),
          title: generateChatTitle(messages),
          messages: [...messages],
        };
        setChatHistory((prev) => [newEntry, ...prev]);
      }
    }
    setMessages(entry.messages);
    setActiveChatId(entry.id);
    setActiveSection("nueva-consulta");
  };

  // eliminar chat
  const handleDeleteChat = (id) => {
    setChatHistory((prev) => prev.filter((c) => c.id !== id));

    if (id === activeChatId) {
      setMessages([]);
      setActiveChatId(null);
    }
  };

  // renombrar chat
  const handleRenameChat = (id, newTitle) => {
    setChatHistory((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, title: newTitle } : c
      )
    );
  };

  // enviar mensaje (MOCK por ahora)
  const handleSend = async (text) => {
    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);

    try {
      // simulación de back
      const fakeResponse = {
        answer:
          "Esta es una respuesta simulada basada en reglamentos académicos de la FISI.",
        sources: ["Reglamento FISI.pdf", "Normativa 2024.docx"],
      };

      await new Promise((r) => setTimeout(r, 500));

      const aiMsg = {
        role: "assistant",
        content: fakeResponse.answer,
        sources: fakeResponse.sources,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error al conectar con el servidor",
        },
      ]);
    }
  };

  return (
    <main className="flex min-h-screen bg-surface">

      {/* SIDEBAR */}
      <ChatSidebar
        activeSection={activeSection}
        chatHistory={chatHistory}
        activeChatId={activeChatId}
        onNuevaConsulta={handleNuevaConsulta}
        onSelectSection={setActiveSection}
        onLoadChat={handleLoadChat}
        onDeleteChat={handleDeleteChat}
        onRenameChat={handleRenameChat}
      />

      {/* MAIN */}
      <section className="flex-1 flex flex-col ml-72">
        <ChatHeader />

        <ChatMain
          activeSection={activeSection}
          messages={messages}
          onSend={handleSend}
        />
      </section>

    </main>
  );
}