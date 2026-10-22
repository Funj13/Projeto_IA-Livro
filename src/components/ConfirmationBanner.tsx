"use client";

import React from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { formatFileSize } from "@/lib/utils";

interface ConfirmationBannerProps {
  pageCount: number;
  estimatedWords: number;
  totalSizeBytes: number;
  studyTitle: string;
  isSubmitted: boolean;
  onConfirm: () => void;
}

export function ConfirmationBanner({
  pageCount,
  estimatedWords,
  totalSizeBytes,
  studyTitle,
  isSubmitted,
  onConfirm,
}: ConfirmationBannerProps) {
  if (pageCount === 0) return null;

  return (
    <>
      {/* Barra de Conclusão / Confirmação das Fotos */}
      <div className="mt-8 rounded-2xl bg-gradient-to-r from-indigo-950/70 via-slate-900 to-slate-900 border border-indigo-500/30 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-base font-semibold text-white flex items-center justify-center sm:justify-start gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Tudo pronto com as fotos?
          </h4>
          <p className="text-xs text-slate-300">
            {pageCount} {pageCount === 1 ? "página selecionada" : "páginas selecionadas"}{" "}
            na sequência correta (~{estimatedWords.toLocaleString("pt-BR")}{" "}
            palavras estimadas).
          </p>
        </div>

        <button
          type="button"
          onClick={onConfirm}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/20 transition cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4" />
          Confirmar Páginas Enviadas
        </button>
      </div>

      {/* Feedback de confirmação do Protótipo Inicial */}
      {isSubmitted && (
        <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-5 text-emerald-200 space-y-3 animate-fadeIn">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="font-semibold text-white text-sm">
                Páginas recebidas com sucesso na interface!
              </h5>
              <p className="text-xs text-emerald-200/90 leading-relaxed">
                O lote{" "}
                <strong>
                  {studyTitle.trim() ? `"${studyTitle.trim()}"` : "Sem título"}
                </strong>{" "}
                com <strong>{pageCount} página(s)</strong> (
                {formatFileSize(totalSizeBytes)}) está pronto. Na próxima etapa do
                projeto, conectaremos este lote à IA gratuita para extrair o
                texto, gerar o áudio/vídeo explicativo e montar o quiz!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
