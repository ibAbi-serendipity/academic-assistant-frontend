export default function Topbar() {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-18rem)] h-20 flex justify-between items-center px-12 bg-surface/80 backdrop-blur-xl editorial-shadow z-40">

      <div className="flex items-center space-x-8">
        <span className="font-headline text-2xl text-primary">
          The Curated Archive
        </span>

        <nav className="hidden lg:flex space-x-6 text-sm">
          <a className="text-slate-500 hover:text-surface-tint">Methodology</a>
          <a className="text-primary border-b-2 border-primary-container pb-1 font-headline">
            Citations
          </a>
          <a className="text-slate-500 hover:text-surface-tint">Export</a>
        </nav>
      </div>

      <input
        className="bg-surface-container-highest rounded-full px-4 py-2"
        placeholder="Search archive..."
      />

    </header>
  );
}