export default function ChatBubbleUser({
  text,
}) {
  return (
    <div className="flex justify-end">

      <div className="max-w-3xl">

        <div className="bg-[#e9edf2] px-8 py-6 rounded-[28px] shadow-sm">
          <p className="text-[15px] leading-8 text-slate-700">
            {text}
          </p>
        </div>

        <p className="text-xs text-slate-400 mt-3 text-right tracking-widest uppercase">
          Usuario
        </p>

      </div>

    </div>
  );
}