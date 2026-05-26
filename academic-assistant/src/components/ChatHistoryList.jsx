import { useState } from "react";
import RenameModal from "./RenameModal";

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
            className={`p-4 rounded-2xl transition ${
              entry.id === activeChatId
                ? "bg-[#002542] text-white"
                : "bg-white hover:bg-slate-100 text-slate-600"
            }`}
          >

            <div
              onClick={() => onLoadChat(entry)}
              className="cursor-pointer text-sm font-medium"
            >
              {entry.title}
            </div>

            <div className="flex gap-3 mt-3 text-xs">

              <button
                onClick={() => {
                  setSelectedChat(entry);
                  setIsModalOpen(true);
                }}
                className="hover:opacity-70"
              >
                ✏️
              </button>

              <button
                onClick={() => onDeleteChat(entry.id)}
                className="hover:opacity-70"
              >
                🗑️
              </button>

            </div>

          </div>

        ))}

      </div>

      <RenameModal
        isOpen={isModalOpen}
        currentTitle={selectedChat?.title}
        onClose={() => setIsModalOpen(false)}
        onSave={(newTitle) => {
          onRenameChat(
            selectedChat.id,
            newTitle
          );
        }}
      />
    </>
  );
}