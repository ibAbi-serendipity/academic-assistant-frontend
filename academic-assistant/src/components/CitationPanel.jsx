export default function CitationPanel() {
  return (
    <div className="bg-surface-container-lowest/85 backdrop-blur-md border-t-2 border-primary rounded-xl p-6 editorial-shadow">
      <span className="text-xs uppercase text-primary">
        Scholarly Citations
      </span>

      <ul className="mt-4 space-y-2 text-xs text-on-surface-variant">
        <li>Ernst, W. (2013) Digital Memory</li>
        <li>Manovich, L. (2001) New Media</li>
      </ul>
    </div>
  );
}