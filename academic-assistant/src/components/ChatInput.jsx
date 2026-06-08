import { useState } from "react";
import { FaSquare } from "react-icons/fa";

export default function ChatInput({ onSend, isSending }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || isSending) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="fixed bottom-0 left-80 right-0 z-10">
      <div className="relative w-full">
        <div className="absolute bottom-full left-0 right-0 h-14 bg-gradient-to-t from-[#f6f7f9] to-transparent pointer-events-none" />

        <div className="w-full bg-[#f6f7f9] pb-6 pt-2 px-10">
          
          <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 bg-white rounded-full px-5 py-3 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={
                  isSending
                    ? 'Pensando respuesta...'
                    : 'Profundiza la investigación o realiza una nueva consulta...'
                }
                className="flex-1 bg-transparent outline-none text-slate-700 px-2"
                disabled={isSending}
              />
              <button
                type="submit"
                disabled={isSending}
                className="w-12 h-12 rounded-full bg-[#002542] text-white flex items-center justify-center hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed text-xl font-bold shrink-0"
              >
                {isSending ? <FaSquare className="text-sm" /> : "↑"}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}