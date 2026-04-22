import { useState } from "react";

export default function ChatInput({ onSend}) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    console.log("Enviando");
    if (!input.trim()) return;

    onSend(input);  
    setInput("");   
  };

  return (
    <div className="p-6 bg-white border-t">

      <div className="flex items-center gap-3">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-4 bg-surface-container-highest rounded-xl"
          placeholder="Escribe tu consulta académica..."
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />

        <button 
          onClick={handleSend}
          className="bg-primary text-white px-6 py-3 rounded-xl"
        >
          Enviar
        </button>

      </div>

      <p className="text-xs text-gray-400 mt-2 text-center">
        El asistente puede generar información incorrecta. Verifica fuentes importantes.
      </p>

    </div>
  );
}