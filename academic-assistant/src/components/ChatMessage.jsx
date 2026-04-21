export default function ChatMessage({ type, text }) {
  const isUser = type === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-lg p-4 rounded-xl ${
          isUser ? "bg-gray-200" : "bg-white border"
        }`}
      >
        {text}
      </div>
    </div>
  );
}