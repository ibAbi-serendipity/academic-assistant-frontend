import ChatHeader from "../components/ChatHeader";
import ChatUser from "../components/ChatUser";
import ChatAI from "../components/ChatAI";
import ChatInput from "../components/ChatInput";

export default function ChatPage() {
  return (
    <main className="flex min-h-screen bg-surface">

      <aside className="w-72 bg-surface-container-low p-6 hidden lg:block">

        <h1 className="font-headline text-2xl italic mb-6">
          El Archivo
        </h1>

        <nav className="space-y-3 text-sm">
          <p className="font-semibold">Nueva consulta</p>
          <p>Biblioteca de investigación</p>
          <p>Archivos guardados</p>
          <p>Analítica académica</p>
        </nav>

      </aside>

      <section className="flex-1 flex flex-col">

        <ChatHeader />

        <div className="flex-1 p-10 space-y-6 overflow-y-auto">
          <ChatUser text="¿Cómo puedo mejorar mi redacción académica en ensayos?" />
          <ChatAI />

        </div>

        <ChatInput />

      </section>

    </main>
  );
}