import CitationPanel from "./CitationPanel";

export default function ChatBubbleAI({
  text,
  sources = [],
  pending = false,
}) {
  const renderText = (value) => {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    if (typeof value === 'object') {
      return (
        value.answer ?? value.content ?? value.text ?? value.message ?? JSON.stringify(value)
      );
    }
    return String(value);
  };

  return (
    <div className="space-y-6">

      <div className="bg-white rounded-[32px] p-7 shadow-sm border border-slate-100">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-9 h-9 rounded-full bg-[#002542] flex items-center justify-center text-white">
            ✦
          </div>

          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-slate-400">
              Nexus
            </p>
          </div>

        </div>

        <div className="prose prose-slate max-w-none">
          {pending && !text ? (
            <div className="flex items-center gap-2 text-slate-500">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-400 animate-pulse" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-400 animate-pulse delay-75" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-400 animate-pulse delay-150" />
            </div>
          ) : (
            <p className="text-[16px] leading-8 text-slate-700 whitespace-pre-wrap">
              {renderText(text)}
            </p>
          )}

        </div>

      </div>

      {!pending && (Array.isArray(sources) && sources.length > 0 ? (
        <CitationPanel sources={sources} />
      ) : typeof sources === 'object' && sources ? (
        <CitationPanel sources={[sources]} />
      ) : null)}

    </div>
  );
}