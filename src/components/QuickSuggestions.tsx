"use client";

import React from "react";
import { BookOpen, Sparkles, HelpCircle, Lightbulb } from "lucide-react";

interface QuickSuggestionsProps {
  onSelectSuggestion: (suggestion: string) => void;
}

const SUGGESTIONS = [
  {
    label: "Resumir um capítulo",
    icon: BookOpen,
  },
  {
    label: "Criar uma aula explicativa",
    icon: Sparkles,
  },
  {
    label: "Gerar perguntas",
    icon: HelpCircle,
  },
  {
    label: "Explicar de forma simples",
    icon: Lightbulb,
  },
];

export function QuickSuggestions({ onSelectSuggestion }: QuickSuggestionsProps) {
  return (
    <div className="w-full flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-1 pb-2">
      {SUGGESTIONS.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.label}
            type="button"
            onClick={() => onSelectSuggestion(item.label)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-700 dark:hover:text-indigo-400 border border-slate-300/90 dark:border-slate-800 shadow-2xs hover:shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-all cursor-pointer active:scale-95"
          >
            <Icon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
