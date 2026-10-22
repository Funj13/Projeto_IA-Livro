"use client";

import React from "react";
import { Layers, Plus, Trash2 } from "lucide-react";
import { BookPageImage } from "@/types/study";
import { PageCard } from "./PageCard";

interface PageGridProps {
  pages: BookPageImage[];
  draggedIndex: number | null;
  onCardDragStart: (index: number) => void;
  onCardDragOver: (e: React.DragEvent, index: number) => void;
  onCardDragEnd: () => void;
  onMovePage: (index: number, direction: "left" | "right") => void;
  onRotatePage: (id: string) => void;
  onRemovePage: (id: string) => void;
  onZoomPage: (page: BookPageImage) => void;
  onAddMore: () => void;
  onClearAll: () => void;
}

export function PageGrid({
  pages,
  draggedIndex,
  onCardDragStart,
  onCardDragOver,
  onCardDragEnd,
  onMovePage,
  onRotatePage,
  onRemovePage,
  onZoomPage,
  onAddMore,
  onClearAll,
}: PageGridProps) {
  if (pages.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <Layers className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base sm:text-lg font-semibold text-white">
            Páginas do Livro ({pages.length})
          </h3>
          <span className="text-xs text-slate-400 hidden sm:inline">
            • Arraste os cartões ou use as setas para ajustar a ordem de leitura
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onAddMore}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Adicionar mais páginas
          </button>

          <button
            type="button"
            onClick={onClearAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20 text-xs font-medium transition cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Limpar tudo
          </button>
        </div>
      </div>

      {/* Grade de Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {pages.map((page, index) => (
          <PageCard
            key={page.id}
            page={page}
            index={index}
            totalPages={pages.length}
            isDragged={draggedIndex === index}
            onDragStart={() => onCardDragStart(index)}
            onDragOver={(e) => onCardDragOver(e, index)}
            onDragEnd={onCardDragEnd}
            onMove={(direction) => onMovePage(index, direction)}
            onRotate={() => onRotatePage(page.id)}
            onRemove={() => onRemovePage(page.id)}
            onZoom={() => onZoomPage(page)}
          />
        ))}
      </div>
    </section>
  );
}
