import ChatHistoryList from "./ChatHistoryList";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ChatSidebar({
  chatHistory,
  activeChatId,
  onNuevaConsulta,
  onLoadChat,
  onDeleteChat,
  onRenameChat,
}) {

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  return (
    <aside className="fixed left-0 top-0 w-80 h-screen bg-white border-r border-slate-200 flex flex-col">

      <div className="p-8 border-b border-slate-100">

        <h1 className="text-5xl italic font-serif text-[#002542]">
          ScholarAI
        </h1>

        <p className="text-xs tracking-[0.3em] uppercase text-slate-400 mt-3">
          Academic Intelligence
        </p>

      </div>

      <div className="p-6">

        <button
          onClick={onNuevaConsulta}
          className="w-full py-4 rounded-2xl bg-[#002542] text-white hover:opacity-90 transition"
        >
          + Nueva consulta
        </button>

      </div>

      <ChatHistoryList
        chatHistory={chatHistory}
        activeChatId={activeChatId}
        onLoadChat={onLoadChat}
        onDeleteChat={onDeleteChat}
        onRenameChat={onRenameChat}
      />

      <div className="mt-auto border-t border-slate-100 p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-full bg-[#002542] text-white flex items-center justify-center text-sm font-semibold">
              {user?.username?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div>
              <p className="font-medium text-slate-700">
                {user?.username || "Usuario"}
              </p>

              <p className="text-sm text-slate-400">
                {user?.email || "Sin correo"}
              </p>
            </div>

          </div>

          <button
            onClick={() => {
              localStorage.removeItem("access");
              localStorage.removeItem("refresh");
              localStorage.removeItem("user");

              navigate("/");
            }}
            className="text-slate-400 hover:text-red-500 transition"
          >
            <LogOut size={20} />
          </button>

        </div>

      </div>

    </aside>
  );
}