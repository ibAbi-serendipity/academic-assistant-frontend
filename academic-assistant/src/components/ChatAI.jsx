export default function ChatAI({ text, sources }) {
  return (
    <div className="flex items-start space-x-3">

      <div className="w-8 h-8 bg-primary rounded-full"></div>

      <div className="bg-white p-6 rounded-xl max-w-xl shadow-sm">

        <h3 className="font-headline text-lg mb-2">
          Respuesta del asistente
        </h3>

        <p className="text-sm text-gray-600">
          {text}
        </p>

        {sources && (
          <p className="text-xs text-gray-400 mt-3">
            Fuente: {Array.isArray(sources) ? sources.join(", ") : sources}
          </p>
        )}

      </div>

    </div>
  );
}