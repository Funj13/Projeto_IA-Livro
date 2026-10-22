"use client";

import React from "react";
import { ACCEPTED_FORMATS_TEXT } from "@/lib/constants";

interface StudyInfoCardProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
}

export function StudyInfoCard({ title, onTitleChange }: StudyInfoCardProps) {
  return (
    <div className="lg:col-span-2 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
      <div>
        <label
          htmlFor="study-title"
          className="block text-sm font-medium text-slate-200 mb-1"
        >
          Qual livro ou matéria você vai estudar hoje?
        </label>
        <p className="text-xs text-slate-400 mb-3">
          Dê um título opcional para identificar este conjunto de páginas.
        </p>
        <input
          id="study-title"
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Ex: Capítulo 4 — Revolução Industrial (História)"
          className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
        />
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/70 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
        <span>
          💡 Dica: Você também pode colar prints ou fotos direto com{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700 font-mono">
            Ctrl + V
          </kbd>
        </span>
        <span>Formatos aceitos: {ACCEPTED_FORMATS_TEXT}</span>
      </div>
    </div>
  );
}
