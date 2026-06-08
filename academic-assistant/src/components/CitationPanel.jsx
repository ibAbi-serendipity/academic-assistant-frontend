export default function CitationPanel({
  sources = [],
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">

      <h3 className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-5">
        Fuentes
      </h3>

      <div className="space-y-4">

        {sources.map((src, i) => (
          <div
            key={i}
            className="border-l-4 border-[#002542] pl-4"
          >
            <p className="font-medium text-slate-700">
              {typeof src.document === 'object'
                ? src.document.title ?? src.document.doc_name ?? 'Documento'
                : src.document || 'Documento'}
            </p>

            {src.page && (
              <p className="text-sm text-slate-400">
                Página {src.page}
              </p>
            )}

            {src.fragment && (
              <p className="text-sm text-slate-500 mt-2 italic">
                “{src.fragment}”
              </p>
            )}
          </div>
        ))}

      </div>

    </div>
  );
}