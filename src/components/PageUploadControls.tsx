"use client";

import React, { RefObject } from "react";
import { FileImage, Camera, Trash2, Plus } from "lucide-react";

interface PageUploadControlsProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  cameraInputRef: RefObject<HTMLInputElement | null>;
  hasPages: boolean;
  onClearAll?: () => void;
}

export function PageUploadControls({
  fileInputRef,
  cameraInputRef,
  hasPages,
  onClearAll,
}: PageUploadControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-indigo-700 dark:hover:text-indigo-400 hover:bg-indigo-50/80 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-slate-600 transition cursor-pointer shadow-2xs"
        title="Selecione imagens do computador ou celular (JPG, PNG, WEBP, HEIC)"
      >
        {hasPages ? (
          <Plus className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
        ) : (
          <FileImage className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
        )}
        <span>{hasPages ? "Adicionar mais páginas" : "Adicionar páginas"}</span>
      </button>

      <button
        type="button"
        onClick={() => cameraInputRef.current?.click()}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-indigo-700 dark:hover:text-indigo-400 hover:bg-indigo-50/80 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-slate-600 transition cursor-pointer shadow-2xs"
        title="Tirar foto diretamente com a câmera do dispositivo"
      >
        <Camera className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
        <span>Tirar foto</span>
      </button>

      {hasPages && onClearAll && (
        <button
          type="button"
          onClick={onClearAll}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-semibold transition cursor-pointer"
          title="Limpar todas as páginas adicionadas"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Limpar páginas</span>
        </button>
      )}
    </div>
  );
}
