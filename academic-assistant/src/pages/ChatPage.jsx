import ChatHeader from "../components/ChatHeader";
import ChatUser from "../components/ChatUser";
import ChatAI from "../components/ChatAI";
import ChatInput from "../components/ChatInput";
import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);

  const handleSend = async (text) => {
    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);

    try{
      const res  = await fetch(
        "/api/chat-free/", 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            question: text }),
        }
      );

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
        { role: "assistant", 
          content: "Error al conectar con el servidor",
        },
      ]);
    }
  };

  return (
    <main className="flex min-h-screen bg-surface">

      <aside className="w-72 bg-surface-container-low p-6 hidden lg:block">

        <h1 className="font-headline text-2xl italic mb-6">
          El Archivo
        </h1>

        <nav className="space-y-3 text-sm">
          <p className="font-semibold">Nueva consulta</p>
          <p>Biblioteca de investigación</p>
          <p>Archivos guardados</p>
          <p>Analítica académica</p>
        </nav>

      </aside>

      <section className="flex-1 flex flex-col">

        <ChatHeader />

        <div className="flex-1 p-10 space-y-6 overflow-y-auto">
            {messages.map((msg, i) =>
              msg.role === "user" ? (
                <ChatUser key={i} text={msg.content} />
              ) : (
                <ChatAI key={i} text={msg.content} sources={msg.sources} />
              )
            )}
        </div>

        <ChatInput onSend={handleSend} />

      </section>

    </main>
  );
}