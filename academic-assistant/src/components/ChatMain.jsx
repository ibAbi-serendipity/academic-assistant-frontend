import ChatBubbleUser from "./ChatBubbleUser";
import ChatBubbleAI from "./ChatBubbleAI";
import ChatInput from "./ChatInput";

export default function ChatMain({
  activeSection,
  messages,
  onSend,
}) {
  const placeholders = {
    biblioteca: {
      icon: "📚",
      label: "Biblioteca de investigación",
    },
    archivos: {
      icon: "🗂️",
      label: "Archivos guardados",
    },
    analitica: {
      icon: "📊",
      label: "Analítica académica",
    },
  };

  if (activeSection !== "nueva-consulta") {
    const { icon, label } =
      placeholders[activeSection];

    return (
      <div className="flex-1 flex items-center justify-center text-slate-400">
        <div className="text-center space-y-3">
          <p className="text-4xl">{icon}</p>

          <p className="text-2xl font-serif italic">
            {label}
          </p>

          <p className="text-sm">
            Próximamente disponible
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto px-16 py-10 bg-[#f6f7f9]">

        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <h2 className="text-5xl italic font-serif text-[#002542]">
                ¿Cómo puedo ayudarte hoy?
              </h2>

              <p className="text-slate-400">
                Escribe tu primera consulta académica
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-10">

            {messages.map((msg, i) =>
              msg.role === "user" ? (
                <ChatBubbleUser
                  key={i}
                  text={msg.content}
                />
              ) : (
                <ChatBubbleAI
                  key={i}
                  text={msg.content}
                  sources={msg.sources}
                />
              )
            )}

          </div>
        )}

      </div>

      <ChatInput onSend={onSend} />
    </>
  );
}