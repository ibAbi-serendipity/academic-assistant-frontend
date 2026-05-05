export default function ChatHistoryList({
  chatHistory,
  activeChatId,
  onLoadChat,
  onDeleteChat,
  onRenameChat,
}) {
  if (chatHistory.length === 0) return null;

  return (
    <div className="flex-1 overflow-y-auto space-y-2">

      {chatHistory.map((entry) => (
        <div
          key={entry.id}
          className={`p-2 rounded-lg cursor-pointer ${
            entry.id === activeChatId
              ? "bg-primary/10 text-primary"
              : "hover:bg-surface-container text-gray-500"
          }`}
        >
          <div onClick={() => onLoadChat(entry)}>
            {entry.title}
          </div>

          <div className="flex gap-2 mt-1 text-xs">
            <button onClick={() => {
              const newTitle = prompt("Nuevo nombre:");
              if (newTitle) onRenameChat(entry.id, newTitle);
            }}>
              ✏️
            </button>

            <button onClick={() => onDeleteChat(entry.id)}>
              🗑️
            </button>
          </div>
        </div>
      ))}

    </div>
  );
}