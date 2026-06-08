import ChatBubbleUser from "./ChatBubbleUser";
import ChatBubbleAI from "./ChatBubbleAI";
import ChatInput from "./ChatInput";

export default function ChatMain({
  activeSection,
  messages,
  onSend,
  isSending,
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
    <div className="relative flex-1 min-h-0 bg-[#f6f7f9]">
      
      <div className="absolute inset-x-0 top-0 bottom-0 overflow-y-auto px-16 py-10 pb-36">

        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <h2 className="text-5xl italic font-serif text-[#002542]">
                {isSending ? 'Pensando respuesta...' : '¿Cómo puedo ayudarte hoy?'}
              </h2>
              <p className="text-slate-400">
                {isSending ? 'La IA está analizando tu consulta.' : 'Escribe tu primera consulta académica'}
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-10">
            {messages.map((msg, i) => {
              if (msg && (msg.question !== undefined || msg.answer !== undefined)) {
                const questionText = msg.question ?? '';
                const answerText = msg.answer ?? '';
                const sources = msg.sources ?? [];

                return (
                  <div key={msg.id ?? `interaction-${i}` } className="space-y-10">
                    <ChatBubbleUser text={questionText} />
                    <ChatBubbleAI text={answerText} sources={sources} />
                  </div>
                );
              }

              const role = String(msg.role ?? msg.sender ?? 'assistant').toLowerCase();
              const text = msg.content ?? msg.answer ?? msg.message ?? msg.text ?? '';
              const pending = msg.pending === true;

              return role === 'user' ? (
                <ChatBubbleUser key={msg.id ?? i} text={text} />
              ) : (
                <ChatBubbleAI
                  key={msg.id ?? i}
                  text={text}
                  sources={msg.sources ?? []}
                  pending={pending}
                />
              );
            })}
          </div>
        )}

      </div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <ChatInput onSend={onSend} isSending={isSending} />
      </div>
    </div>
  );
}