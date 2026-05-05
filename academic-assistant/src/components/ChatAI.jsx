export default function ChatAI({ text, sources = [] }) {
  return (
    <div className="flex items-start space-x-3">

      <div className="w-8 h-8 bg-primary rounded-full"></div>

      <div className="bg-white p-6 rounded-xl max-w-xl shadow-sm">

        <h3 className="font-headline text-lg mb-2">
          Respuesta del asistente
        </h3>

        <p className="text-sm text-gray-600 mb-4">
          {text}
        </p>

        {sources.length > 0 && (
          <div className="text-xs text-gray-400">
            <p className="font-semibold mb-1">Fuentes:</p>
            <ul className="list-disc ml-4 space-y-1">
              {sources.map((src, i) => (
                <li key={i}>{src}</li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}