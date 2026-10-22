"use client";

import React from "react";
import { RotateCw, X } from "lucide-react";
import { BookPageImage } from "@/types/study";

interface ZoomModalProps {
  page: BookPageImage | null;
  pageIndex: number;
  onClose: () => void;
  onRotate: () => void;
}

export function ZoomModal({
  page,
  pageIndex,
  onClose,
  onRotate,
}: ZoomModalProps) {
  if (!page) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
      >
        <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Página {pageIndex + 1}
            </span>
            <span className="text-sm text-slate-200 truncate">{page.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onRotate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              Girar 90°
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6 flex items-center justify-center bg-slate-950/60">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={page.previewUrl}
            alt={page.name}
            style={{ transform: `rotate(${page.rotation}deg)` }}
            className="max-h-[75vh] w-auto object-contain rounded-lg transition-transform duration-200"
          />
        </div>
      </div>
    </div>
  );
}
