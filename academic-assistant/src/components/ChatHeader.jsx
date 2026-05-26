export default function ChatHeader() {
  return (
    <header className="h-24 border-b bg-white flex items-center px-10">
      <div>
        <h1 className="text-3xl font-serif text-slate-800">
          Asistente Académico IA
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Consulta documentos y normativa universitaria
        </p>
      </div>
    </header>
  );
}