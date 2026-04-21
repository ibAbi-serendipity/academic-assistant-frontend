export default function Sidebar() {
  return (
    <aside className="h-screen w-72 fixed left-0 top-0 bg-surface-container-low flex flex-col py-8 z-50">
      
      <div className="px-8 mb-10">
        <h1 className="font-headline italic text-2xl text-primary">
          The Atelier
        </h1>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mt-1">
          Academic Intelligence
        </p>
      </div>

      <nav className="flex-1 space-y-2 px-6 overflow-y-auto">

        <div className="flex items-center space-x-4 bg-secondary-fixed text-primary rounded-r-full px-6 py-3">
          <span className="material-symbols-outlined">add_notes</span>
          <span className="text-sm">New Inquiry</span>
        </div>

        <div className="flex items-center space-x-4 px-6 py-3 hover:bg-surface-container">
          <span className="material-symbols-outlined">auto_stories</span>
          <span className="text-sm">Research Library</span>
        </div>

        <div className="flex items-center space-x-4 px-6 py-3 hover:bg-surface-container">
          <span className="material-symbols-outlined">inventory_2</span>
          <span className="text-sm">Curated Archives</span>
        </div>

      </nav>
    </aside>
  );
}