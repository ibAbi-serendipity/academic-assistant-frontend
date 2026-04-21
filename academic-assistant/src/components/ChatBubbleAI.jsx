import CitationPanel from "./CitationPanel";

export default function ChatBubbleAI() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="bg-white p-8 rounded-2xl editorial-shadow">
        <h3 className="font-serif text-2xl text-[#002542] mb-4">
          The Digital Ontological Shift
        </h3>

        <p className="text-sm text-gray-600">
          The shift from physical archives to digital records...
        </p>
      </div>

      <CitationPanel />
    </div>
  );
}