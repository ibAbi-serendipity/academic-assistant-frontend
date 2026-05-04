import { useState } from "react";
import ChatHeader from "../components/ChatHeader";
import ChatSidebar from "../components/ChatSidebar";
import ChatMain from "../components/ChatMain";
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

  const handleSelectSection = (section) => {
    setActiveSection(section);
  };

  const handleSend = async (text) => {
    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("/api/chat-free/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });

      const data = await res.json();

      const aiMsg = {
        role: "assistant",
        content: data.answer,
        sources: data.sources,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error al conectar con el servidor" },
      ]);
    }
  };

  return (
    <main className="flex min-h-screen bg-surface">

      <ChatSidebar
        activeSection={activeSection}
        chatHistory={chatHistory}
        activeChatId={activeChatId}
        onNuevaConsulta={handleNuevaConsulta}
        onSelectSection={handleSelectSection}
        onLoadChat={handleLoadChat}
      />
      <section className="flex-1 flex flex-col">
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