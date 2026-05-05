import ChatHistoryList from "./ChatHistoryList";

export default function ChatSidebar({
  chatHistory,
  activeChatId,
  onNuevaConsulta,
  onLoadChat,
  onDeleteChat,
  onRenameChat,
}) {
  return (
    <aside className="h-screen w-72 fixed left-0 top-0 bg-surface-container-low flex flex-col py-6 px-4">

      <div className="mb-6">
        <h1 className="font-headline italic text-2xl text-primary">
          The Atelier
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Academic Intelligence
        </p>
      </div>

      <button
        onClick={onNuevaConsulta}
        className="mb-4 bg-primary text-white py-2 rounded-xl text-sm"
      >
        + Nueva consulta
      </button>

      <ChatHistoryList
        chatHistory={chatHistory}
        activeChatId={activeChatId}
        onLoadChat={onLoadChat}
        onDeleteChat={onDeleteChat}
        onRenameChat={onRenameChat}
      />

    </aside>
  );
}