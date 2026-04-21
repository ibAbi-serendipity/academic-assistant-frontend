export default function InsightCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

      <div className="p-5 rounded-xl bg-surface-container-low border-l-4 border-primary">
        <h4 className="font-headline text-lg text-primary mb-2">
          Key Takeaway: Malleability
        </h4>
        <p className="text-xs text-on-surface-variant">
          Digital records are inherently unstable...
        </p>
      </div>

      <div className="p-5 rounded-xl bg-surface-container-low border-l-4 border-primary">
        <h4 className="font-headline text-lg text-primary mb-2">
          Key Takeaway: Curation
        </h4>
        <p className="text-xs text-on-surface-variant">
          AI-driven archival retrieval introduces bias...
        </p>
      </div>

    </div>
  );
}