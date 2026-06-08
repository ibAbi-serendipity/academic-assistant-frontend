import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function RenameModal({
  isOpen,
  onClose,
  onSave,
  currentTitle,
}) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(currentTitle || "");
  }, [currentTitle]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl">
        <h2 className="text-2xl font-serif text-[#002542] mb-2">
          Renombrar chat
        </h2>

        <p className="text-sm text-slate-400 mb-6">
          Cambia el nombre de este chat
        </p>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#002542]"
          placeholder="Nuevo nombre..."
        />

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 transition"
          >
            Cancelar
          </button>

          <button
            onClick={() => {
              onSave(value);
              onClose();
            }}
            className="px-5 py-3 rounded-2xl bg-[#002542] text-white"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}