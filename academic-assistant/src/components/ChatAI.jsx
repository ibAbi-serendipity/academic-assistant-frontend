export default function ChatAI({
  text,
  sources = [],
}) {
  return (
    <div className="max-w-4xl">

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-semibold">
            AI
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              Asistente Académico
            </h3>

            <p className="text-xs text-slate-400">
              Respuesta generada
            </p>
          </div>

        </div>

        <div className="prose prose-slate max-w-none">
          <p className="leading-8 text-slate-700 whitespace-pre-wrap">
            {text}
          </p>
        </div>

        {sources.length > 0 && (
          <div className="mt-8 pt-5 border-t">

            <h4 className="text-sm font-semibold mb-3 text-slate-700">
              Referencias
            </h4>

            <div className="space-y-2">
              {sources.map((src, i) => (
                <div
                  key={i}
                  className="
                    bg-slate-50
                    border
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                  "
                >
                  <p className="font-medium">
                    {src.document}
                  </p>

                  <p className="text-slate-500 text-xs">
                    Página {src.page}
                  </p>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}