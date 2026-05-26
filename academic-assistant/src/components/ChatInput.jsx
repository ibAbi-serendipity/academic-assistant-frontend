import { useState } from "react";

export default function ChatInput({
  onSend,
}) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    onSend(text);

    setText("");
  };

  return (
    <div className="border-t border-slate-200 bg-white px-10 py-6">

      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto"
      >

        <div className="flex items-center gap-4 bg-[#f6f7f9] rounded-full px-6 py-4 border border-slate-200">

          <input
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
            placeholder="Profundiza la investigación o realiza una nueva consulta..."
            className="flex-1 bg-transparent outline-none text-slate-700"
          />

          <button
            type="submit"
            className="w-12 h-12 rounded-full bg-[#002542] text-white flex items-center justify-center hover:scale-105 transition"
          >
            ↑
          </button>

        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          La IA puede generar información incorrecta.
          Verifica fuentes académicas importantes.
        </p>

      </form>

    </div>
  );
}