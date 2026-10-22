"use client";

import React from "react";
import { Layers } from "lucide-react";
import { StudyPage } from "@/types/study";
import { UploadedPageThumbnail } from "./UploadedPageThumbnail";

interface UploadedPagesPreviewProps {
  pages: StudyPage[];
  draggedIndex: number | null;
  onMovePage: (index: number, direction: "left" | "right") => void;
  onRotatePage: (id: string) => void;
  onRemovePage: (id: string) => void;
  onZoomPage: (page: StudyPage) => void;
  onCardDragStart: (index: number) => void;
  onCardDragOver: (e: React.DragEvent, index: number) => void;
  onCardDragEnd: () => void;
}

export function UploadedPagesPreview({
  pages,
  draggedIndex,
  onMovePage,
  onRotatePage,
  onRemovePage,
  onZoomPage,
  onCardDragStart,
  onCardDragOver,
  onCardDragEnd,
}: UploadedPagesPreviewProps) {
  if (pages.length === 0) return null;

  return (
    <div className="w-full space-y-3 pt-2">
      {/* Indicador de miniaturas e dica de interação sem duplicidade */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2.5">
          {/* Indicador das miniaturas */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-900 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            <Layers className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            {pages.length} {pages.length === 1 ? "página" : "páginas"}
          </span>

          <span className="text-xs text-slate-600 dark:text-slate-400 font-normal">
            Arraste os cartões ou use as setas para ajustar a ordem
          </span>
        </div>
      </div>

      {/* Lista de miniaturas (Rolagem horizontal fluida no celular 320px+ e grid no desktop) */}
      <div className="flex sm:grid sm:grid-cols-4 md:grid-cols-5 gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar sm:overflow-visible">
        {pages.map((page, index) => (
          <UploadedPageThumbnail
            key={page.id}
            page={page}
            index={index}
            totalPages={pages.length}
            isDragged={draggedIndex === index}
            onDragStart={() => onCardDragStart(index)}
            onDragOver={(e) => onCardDragOver(e, index)}
            onDragEnd={onCardDragEnd}
            onMovePage={(direction) => onMovePage(index, direction)}
            onRotatePage={() => onRotatePage(page.id)}
            onRemovePage={() => onRemovePage(page.id)}
            onZoomPage={() => onZoomPage(page)}
          />
        ))}
      </div>
    </div>
  );
}
