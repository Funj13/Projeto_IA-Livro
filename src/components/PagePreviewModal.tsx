"use client";

import React from "react";
import { RotateCw, X } from "lucide-react";
import { StudyPage } from "@/types/study";

interface PagePreviewModalProps {
  page: StudyPage | null;
  pageIndex: number;
  totalPages: number;
  onClose: () => void;
  onRotate: () => void;
}

export function PagePreviewModal({
  page,
  pageIndex,
  totalPages,
  onClose,
  onRotate,
}: PagePreviewModalProps) {
  if (!page) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 transition-all"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Cabeçalho do Modal */}
        <div className="px-5 py-3.5 bg-slate-50/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5 truncate">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              Página {pageIndex + 1} de {totalPages}
            </span>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
              {page.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onRotate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-medium transition cursor-pointer shadow-2xs"
            >
              <RotateCw className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              Girar 90°
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition cursor-pointer shadow-2xs"
              aria-label="Fechar pré-visualização"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visualizador da Imagem */}
        <div className="flex-1 overflow-auto p-6 flex items-center justify-center bg-slate-100/70 dark:bg-slate-950/90">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={page.previewUrl}
            alt={`Página ${pageIndex + 1} - ${page.name}`}
            style={{ transform: `rotate(${page.rotation}deg)` }}
            className="max-h-[72vh] w-auto object-contain rounded-xl shadow-md transition-transform duration-200"
          />
        </div>
      </div>
    </div>
  );
}
