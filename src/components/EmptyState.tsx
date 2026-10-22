"use client";

import React from "react";
import { Sparkles, FileText, Headphones, HelpCircle } from "lucide-react";

export function EmptyState() {
  return (
    <div className="w-full text-center space-y-4 max-w-xl mx-auto pt-2 pb-1">
      {/* Badge acolhedor de alto contraste */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-900 dark:text-indigo-300 text-xs font-semibold shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
        <span className="truncate">Transforme páginas físicas em aprendizado dinâmico</span>
      </div>

      {/* Título Principal com quebra controlada em telas pequenas */}
      <h1 className="text-2xl min-[360px]:text-3xl sm:text-4xl md:text-[2.65rem] font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
        <span className="block sm:inline">O que você quer </span>
        <span className="inline-block bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 dark:from-indigo-400 dark:via-indigo-300 dark:to-violet-400 bg-clip-text text-transparent">
          aprender hoje?
        </span>
      </h1>

      {/* Subtítulo com contraste aprimorado */}
      <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-lg mx-auto font-normal">
        Tire fotos ou envie imagens das páginas do seu livro para gerar
        explicações didáticas narradas e perguntas práticas de fixação.
      </p>

      {/* Destaques amigáveis com contraste garantido */}
      <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
        <span className="flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          Resumos por tópicos
        </span>
        <span className="flex items-center gap-1.5">
          <Headphones className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          Aulas explicativas
        </span>
        <span className="flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          Quizzes com correção
        </span>
      </div>
    </div>
  );
}
