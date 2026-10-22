"use client";

import React from "react";
import { ArrowLeft, ArrowRight, RotateCw, Trash2, ZoomIn } from "lucide-react";
import { BookPageImage } from "@/types/study";
import { formatFileSize } from "@/lib/utils";

interface PageCardProps {
  page: BookPageImage;
  index: number;
  totalPages: number;
  isDragged: boolean;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  onMove: (direction: "left" | "right") => void;
  onRotate: () => void;
  onRemove: () => void;
  onZoom: () => void;
}

export function PageCard({
  page,
  index,
  totalPages,
  isDragged,
  onDragStart,
  onDragOver,
  onDragEnd,
  onMove,
  onRotate,
  onRemove,
  onZoom,
}: PageCardProps) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      className={`group relative rounded-2xl bg-slate-900 border transition-all overflow-hidden flex flex-col ${
        isDragged
          ? "border-indigo-400 opacity-50 scale-95"
          : "border-slate-800 hover:border-slate-700"
      }`}
    >
      {/* Cabeçalho do Card com número da página */}
      <div className="px-3.5 py-2.5 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 bg-indigo-500/15 border border-indigo-500/30 px-2.5 py-0.5 rounded-md">
          Página {index + 1}
        </span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onMove("left")}
            disabled={index === 0}
            title="Mover página para trás"
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-25 disabled:pointer-events-none transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onMove("right")}
            disabled={index === totalPages - 1}
            title="Mover página para frente"
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-25 disabled:pointer-events-none transition"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Miniatura da Imagem */}
      <div
        onClick={onZoom}
        className="relative aspect-[3/4] w-full bg-slate-950 flex items-center justify-center overflow-hidden cursor-zoom-in"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={page.previewUrl}
          alt={`Página ${index + 1} - ${page.name}`}
          style={{ transform: `rotate(${page.rotation}deg)` }}
          className="w-full h-full object-contain transition-transform duration-200"
        />

        {/* Overlay ao passar o mouse */}
        <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 text-white text-xs font-medium border border-slate-700 shadow">
            <ZoomIn className="w-3.5 h-3.5 text-indigo-400" />
            Ampliar
          </span>
        </div>
      </div>

      {/* Rodapé com metadados e ações (Girar / Excluir) */}
      <div className="p-3 bg-slate-900 flex items-center justify-between gap-2 mt-auto border-t border-slate-800/80">
        <div className="truncate">
          <p
            className="text-xs font-medium text-slate-200 truncate"
            title={page.name}
          >
            {page.name}
          </p>
          <p className="text-[11px] text-slate-500">
            {formatFileSize(page.sizeBytes)}
          </p>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={onRotate}
            title="Girar foto em 90°"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onRemove}
            title="Remover página"
            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
