import { useState } from "react";
import RenameModal from "./RenameModal";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import { FaRegTrashAlt } from "react-icons/fa";

export default function ChatHistoryList({
  chatHistory,
  activeChatId,
  onLoadChat,
  onDeleteChat,
  onRenameChat,
}) {

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [selectedChat, setSelectedChat] =
    useState(null);

  if (chatHistory.length === 0) return null;

  return (
    <>
      <div className="flex-1 overflow-y-auto space-y-2 px-4 pb-4">

        {chatHistory.map((entry) => (

          <div
            key={entry.id}
            onClick={() => onLoadChat(entry)}
            className={`p-3 rounded-full transition flex items-center px-5 justify-between ${
              entry.id === activeChatId
                ? "bg-slate-100 font-bold"
                : "bg-white hover:bg-slate-100 text-slate-600 font-medium"
            }`}
          >

            <div className="flex-1 min-w-0 cursor-pointer">
              <div className="text-sm font-medium truncate">{entry.title}</div>
            </div>

            <div className="flex gap-3 text-xs">

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedChat(entry);
                  setIsModalOpen(true);
                }}
                className="hover:opacity-70"
              >
                <PiPencilSimpleLineFill size={16} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteChat(entry.id);
                }}
                className="hover:opacity-70"
              >
                <FaRegTrashAlt size={16} />
              </button>

            </div>

          </div>

        ))}

      </div>

      <RenameModal
        isOpen={isModalOpen}
        currentTitle={selectedChat?.title}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedChat(null);
        }}
        onSave={(newTitle) => {
          if (selectedChat) {
            onRenameChat(
              selectedChat.id,
              newTitle
            );
          }
        }}
      />
    </>
  );
}