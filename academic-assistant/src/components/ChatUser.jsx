export default function ChatUser({ text }) {
  return (
    <div className="flex justify-end">
      <div className="bg-surface-container-high p-4 rounded-xl max-w-lg">
        {text}
      </div>
    </div>
  );
}