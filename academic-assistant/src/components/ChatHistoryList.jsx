export default function ChatHistoryList({ chatHistory, activeChatId, onLoadChat }) {
  if (chatHistory.length === 0) return null;
  const baseItem =
    "w-full text-left px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer truncate";
  const itemStyle = (id) =>
    id === activeChatId
      ? `${baseItem} bg-primary/10 text-primary font-semibold`
      : `${baseItem} hover:bg-surface-container text-gray-500`;
  return (
    <div className="flex-1 flex flex-col gap-2 overflow-hidden">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-1">
        Historial
      </p>
      <div className="flex-1 overflow-y-auto space-y-1 pr-1">
        {chatHistory.map((entry) => (
          <button
            key={entry.id}
            className={itemStyle(entry.id)}
            onClick={() => onLoadChat(entry)}
            title={entry.title}
          >
            {entry.title}
          </button>
        ))}
      </div>
    </div>
  );
}