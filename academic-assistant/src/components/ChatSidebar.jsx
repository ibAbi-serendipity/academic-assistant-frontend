import ChatHistoryList from "./ChatHistoryList";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { HiPencilAlt } from "react-icons/hi";
import { HiAcademicCap } from "react-icons/hi2";

export default function ChatSidebar({
  chatHistory,
  activeChatId,
  onNuevaConsulta,
  onLoadChat,
  onDeleteChat,
  onRenameChat,
}) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <aside className="fixed left-0 top-0 w-80 h-screen bg-white border-r border-slate-200 flex flex-col z-20 select-none">
      
      <div className="flex py-8 px-6 gap-3">
        <HiAcademicCap size={40} />
        <div>
          <h1 className="text-lg italic font-serif text-[#002542]">
            Nexus Academic
          </h1>
          <p className="text-xs tracking-[0.2em] uppercase text-slate-400">
            Asistente académico
          </p>
        </div>
      </div>

      <div className="px-5 mb-10 flex-shrink-0">
        <button
          onClick={onNuevaConsulta}
          className="flex items-center justify-start w-full px-5 gap-x-3 py-3 rounded-full bg-[#002542] text-white hover:opacity-80 transition"
        >
          <HiPencilAlt />
          Nueva conversación
        </button>
      </div>

      <p className="px-6 text-xs uppercase text-slate-400 mb-2 flex-shrink-0 tracking-[0.1em]">
        Chats recientes
      </p>

      <div className="flex-1 overflow-y-auto min-h-0 pb-2 [mask-image:linear-gradient(to_bottom,white_80%,transparent_100%)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <ChatHistoryList
          chatHistory={chatHistory}
          activeChatId={activeChatId}
          onLoadChat={onLoadChat}
          onDeleteChat={onDeleteChat}
          onRenameChat={onRenameChat}
        />
      </div>

      <div className="bg-white px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#002542] text-white flex items-center justify-center text-sm font-semibold">
              {user?.username?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div>
              <p className="font-medium text-slate-700">
                {user?.username || "Usuario"}
              </p>
              <p className="text-sm text-slate-400 max-w-[140px] truncate">
                {user?.email || "Sin correo"}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
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