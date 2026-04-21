export default function ChatInput() {
  return (
    <div className="p-6 bg-white border-t">

      <div className="flex items-center gap-3">

        <input
          className="flex-1 p-4 bg-surface-container-highest rounded-xl"
          placeholder="Escribe tu consulta académica..."
        />

        <button className="bg-primary text-white px-6 py-3 rounded-xl">
          Enviar
        </button>

      </div>

      <p className="text-xs text-gray-400 mt-2 text-center">
        El asistente puede generar información incorrecta. Verifica fuentes importantes.
      </p>

    </div>
  );
}