import ChatUser from "./ChatUser";
import ChatAI from "./ChatAI";
import ChatInput from "./ChatInput";
export default function ChatMain({ activeSection, messages, onSend }) {
  // Placeholders para secciones no implementadas aún
  const placeholders = {
    biblioteca: { icon: "📚", label: "Biblioteca de investigación" },
    archivos:   { icon: "🗂️", label: "Archivos guardados" },
    analitica:  { icon: "📊", label: "Analítica académica" },
  };
  if (activeSection !== "nueva-consulta") {
    const { icon, label } = placeholders[activeSection];
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        <div className="text-center space-y-2">
          <p className="text-2xl">{icon}</p>
          <p className="font-headline text-xl">{label}</p>
          <p className="text-sm">Próximamente disponible</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="flex-1 p-10 space-y-6 overflow-y-auto">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-300">
            <p className="font-headline text-xl italic">
              Escribe tu primera consulta…
            </p>
          </div>
        )}
        {messages.map((msg, i) =>
          msg.role === "user" ? (
            <ChatUser key={i} text={msg.content} />
          ) : (
            <ChatAI key={i} text={msg.content} sources={msg.sources} />
          )
        )}
      </div>
      <ChatInput onSend={onSend} />
    </>
  );
}