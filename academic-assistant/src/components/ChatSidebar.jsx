import ChatHistoryList from "./ChatHistoryList";
export default function ChatSidebar({
  activeSection,
  chatHistory,
  activeChatId,
  onNuevaConsulta,
  onSelectSection,
  onLoadChat,
}) {
  const baseNav =
    "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer";
  const navStyle = (section) =>
    section === activeSection
      ? `${baseNav} bg-primary text-white font-semibold`
      : `${baseNav} hover:bg-surface-container text-gray-700 font-medium`;
  return (
    <aside className="w-72 bg-surface-container-low p-6 hidden lg:flex flex-col gap-4">
      <h1 className="font-headline text-2xl italic">El Archivo</h1>
      <nav className="space-y-1">
        <button
          className={navStyle("nueva-consulta")}
          onClick={onNuevaConsulta}
        >
          + Nueva consulta
        </button>

        <button
          className={navStyle("biblioteca")}
          onClick={() => onSelectSection("biblioteca")}
        >
          Biblioteca de investigación
        </button>

        <button
          className={navStyle("archivos")}
          onClick={() => onSelectSection("archivos")}
        >
          Archivos guardados
        </button>
        <button
          className={navStyle("analitica")}
          onClick={() => onSelectSection("analitica")}
        >
          Analítica académica
        </button>
      </nav>
      <ChatHistoryList
        chatHistory={chatHistory}
        activeChatId={activeChatId}
        onLoadChat={onLoadChat}
      />
    </aside>
  );
}