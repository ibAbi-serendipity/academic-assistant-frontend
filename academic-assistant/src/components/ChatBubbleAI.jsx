import CitationPanel from "./CitationPanel";

export default function ChatBubbleAI({
  text,
  sources = [],
}) {
  return (
    <div className="space-y-6">

      <div className="bg-white rounded-[32px] p-10 shadow-sm border border-slate-100">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-10 h-10 rounded-full bg-[#002542] flex items-center justify-center text-white">
            ✦
          </div>

          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-slate-400">
              Atelier AI
            </p>
          </div>

        </div>

        <div className="prose prose-slate max-w-none">

          <p className="text-[16px] leading-8 text-slate-700 whitespace-pre-wrap">
            {text}
          </p>

        </div>

      </div>

      {sources.length > 0 && (
        <CitationPanel sources={sources} />
      )}

    </div>
  );
}