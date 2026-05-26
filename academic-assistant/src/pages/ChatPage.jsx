import { useState } from "react";
import ChatHeader from "../components/ChatHeader";
import ChatSidebar from "../components/ChatSidebar";
import ChatMain from "../components/ChatMain";

function generateChatTitle(messages) {
  const firstUser = messages.find(
    (m) => m.role === "user"
  );

  if (!firstUser) return "Chat sin título";

  const words = firstUser.content
    .trim()
    .split(" ")
    .slice(0, 5)
    .join(" ");

  return words.length < firstUser.content.length
    ? `${words}…`
    : words;
}

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [activeSection, setActiveSection] = useState("nueva-consulta");

  const handleNuevaConsulta = () => {

    if (messages.length > 0) {

      // SI EL CHAT YA EXISTE → ACTUALIZAR
      if (activeChatId) {

        setChatHistory((prev) =>
          prev.map((chat) =>
            chat.id === activeChatId
              ? {
                  ...chat,
                  messages: [...messages],
                  title: generateChatTitle(messages),
                }
              : chat
          )
        );

      } else {

        // SI ES NUEVO → CREAR
        const newEntry = {
          id: Date.now(),
          title: generateChatTitle(messages),
          messages: [...messages],
        };

        setChatHistory((prev) => [newEntry, ...prev]);
      }
    }

    // limpiar pantalla
    setMessages([]);
    setActiveChatId(null);
    setActiveSection("nueva-consulta");
  };

  const handleLoadChat = (entry) => {
    // guardar cambios del chat actual antes de cambiar
    if (messages.length > 0 && activeChatId) {

      setChatHistory((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId
            ? {
                ...chat,
                messages: [...messages],
                title: generateChatTitle(messages),
              }
            : chat
        )
      );
    }

    setMessages(entry.messages);
    setActiveChatId(entry.id);
    setActiveSection("nueva-consulta");
  };

  const handleDeleteChat = (id) => {
    setChatHistory((prev) =>
      prev.filter((c) => c.id !== id)
    );

    if (id === activeChatId) {
      setMessages([]);
      setActiveChatId(null);
    }
  };

  const handleRenameChat = (id, newTitle) => {
    setChatHistory((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, title: newTitle }
          : c
      )
    );
  };

  const handleSend = async (text) => {
    const userMsg = {
      role: "user",
      content: text,
    };

    setMessages((prev) => [
      ...prev,
      userMsg,
    ]);

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/chat-free/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: text,
          }),
        }
      );

      const data = await res.json();
      console.log("CHAT RESPONSE:", data);

      const aiMsg = {
        role: "assistant",
        content: data.answer,
        sources: data.sources || [],
      };

      setMessages((prev) => [
        ...prev,
        aiMsg,
      ]);

    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Error al conectar con el servidor",
        },
      ]);
    }
  };

  return (
    <main className="flex min-h-screen bg-slate-50">

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

      <section className="flex-1 flex flex-col ml-80 min-h-screen">

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