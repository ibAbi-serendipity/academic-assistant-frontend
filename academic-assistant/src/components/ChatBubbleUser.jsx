export default function ChatBubbleUser({
  text,
}) {
  const renderText = (value) => {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    if (typeof value === 'object') {
      return (
        value.question ?? value.content ?? value.text ?? value.message ?? JSON.stringify(value)
      );
    }
    return String(value);
  };

  return (
    <div className="flex justify-end">
      <div className="max-w-3xl">
        <div className="bg-[#e9edf2] px-5 py-3 rounded-[28px] shadow-sm">
          <p className="text-[15px] leading-8 text-slate-700 whitespace-pre-wrap">
            {renderText(text)}
          </p>
        </div>
      </div>

    </div>
  );
}