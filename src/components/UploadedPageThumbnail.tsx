"use client";

import React from "react";
import { ArrowLeft, ArrowRight, RotateCw, ZoomIn, X } from "lucide-react";
import { StudyPage } from "@/types/study";
import { formatFileSize } from "@/lib/utils";

interface UploadedPageThumbnailProps {
  page: StudyPage;
  index: number;
  totalPages: number;
  isDragged: boolean;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  onMovePage: (direction: "left" | "right") => void;
  onRotatePage: () => void;
  onRemovePage: () => void;
  onZoomPage: () => void;
}

export function UploadedPageThumbnail({
  page,
  index,
  totalPages,
  isDragged,
  onDragStart,
  onDragOver,
  onDragEnd,
  onMovePage,
  onRotatePage,
  onRemovePage,
  onZoomPage,
}: UploadedPageThumbnailProps) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      className={`group relative shrink-0 w-32 sm:w-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800 shadow-2xs hover:shadow-sm transition-all overflow-hidden flex flex-col ${
        isDragged
          ? "border-indigo-500 opacity-50 scale-95"
          : "hover:border-indigo-400 dark:hover:border-indigo-600/70"
      }`}
    >
      {/* Topo do card com número sequencial e botões de mover */}
      <div className="px-2 py-1.5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[11px]">
        <span className="font-bold text-indigo-900 dark:text-indigo-300">
          Pág. {index + 1}
        </span>

        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={() => onMovePage("left")}
            disabled={index === 0}
            className="p-1 rounded text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 disabled:opacity-20 disabled:pointer-events-none transition cursor-pointer"
            title="Mover página para a esquerda"
          >
            <ArrowLeft className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={() => onMovePage("right")}
            disabled={index === totalPages - 1}
            className="p-1 rounded text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 disabled:opacity-20 disabled:pointer-events-none transition cursor-pointer"
            title="Mover página para a direita"
          >
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Miniatura da Imagem com clique para ampliar */}
      <div
        onClick={onZoomPage}
        className="relative aspect-[3/4] w-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center overflow-hidden cursor-zoom-in"
        title="Clique para ampliar"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={page.previewUrl}
          alt={`Página ${index + 1} - ${page.name}`}
          style={{ transform: `rotate(${page.rotation}deg)` }}
          className="w-full h-full object-contain transition-transform duration-200"
        />

        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="p-1.5 rounded-full bg-white/95 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 shadow-sm">
            <ZoomIn className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Rodapé com nome/tamanho e botões de rotação e exclusão */}
      <div className="p-2 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 space-y-1">
        <p
          className="text-[10px] font-medium text-slate-700 dark:text-slate-300 truncate"
          title={page.name}
        >
          {page.name}
        </p>

        <div className="flex items-center justify-between gap-1">
          <span className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold truncate">
            {formatFileSize(page.sizeBytes)}
          </span>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={onRotatePage}
              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-400 transition cursor-pointer"
              title="Girar foto em 90°"
            >
              <RotateCw className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={onRemovePage}
              className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/40 text-slate-600 dark:text-slate-400 hover:text-red-700 dark:hover:text-red-400 transition cursor-pointer"
              title="Remover página"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
