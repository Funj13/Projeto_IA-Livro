"use client";

import React, { RefObject } from "react";
import { FileImage, CheckCircle2, RefreshCw, Loader2 } from "lucide-react";
import { StudyPage } from "@/types/study";
import { STUDY_MESSAGES } from "@/lib/constants";
import { UploadedPagesPreview } from "./UploadedPagesPreview";
import { PageUploadControls } from "./PageUploadControls";
import { StudyActionButton } from "./StudyActionButton";

interface StudyComposerProps {
  studyTitle: string;
  onTitleChange: (value: string) => void;
  pages: StudyPage[];
  isDraggingOver: boolean;
  isProcessing: boolean;
  processingStep: string;
  isSubmitted: boolean;
  createdStudyId: string | null;
  draggedIndex: number | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  cameraInputRef: RefObject<HTMLInputElement | null>;
  onFilesSelected: (files: FileList | File[]) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onMovePage: (index: number, direction: "left" | "right") => void;
  onRotatePage: (id: string) => void;
  onRemovePage: (id: string) => void;
  onZoomPage: (page: StudyPage) => void;
  onCardDragStart: (index: number) => void;
  onCardDragOver: (e: React.DragEvent, index: number) => void;
  onCardDragEnd: () => void;
  onClearAll: () => void;
  onStartStudy: () => void;
  onResetStudy: () => void;
}

export function StudyComposer({
  studyTitle,
  onTitleChange,
  pages,
  isDraggingOver,
  isProcessing,
  processingStep,
  isSubmitted,
  createdStudyId,
  draggedIndex,
  fileInputRef,
  cameraInputRef,
  onFilesSelected,
  onDragOver,
  onDragLeave,
  onDrop,
  onMovePage,
  onRotatePage,
  onRemovePage,
  onZoomPage,
  onCardDragStart,
  onCardDragOver,
  onCardDragEnd,
  onClearAll,
  onStartStudy,
  onResetStudy,
}: StudyComposerProps) {
  const hasPages = pages.length > 0;

  return (
    <div className="w-full max-w-[760px] mx-auto">
      {/* Caixa de Composição estilo Chat / Prompt */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative rounded-3xl bg-white dark:bg-slate-900 border transition-all duration-200 overflow-hidden shadow-xl shadow-indigo-900/5 dark:shadow-black/40 ${
          isDraggingOver
            ? "border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/40 ring-4 ring-indigo-100 dark:ring-indigo-950/60"
            : "border-slate-300/80 dark:border-slate-800 hover:border-slate-400/80 dark:hover:border-slate-700 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100/70 dark:focus-within:ring-indigo-950/50"
        }`}
      >
        {/* Hidden File Inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              onFilesSelected(e.target.files);
              e.target.value = "";
            }
          }}
          className="hidden"
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              onFilesSelected(e.target.files);
              e.target.value = "";
            }
          }}
          className="hidden"
        />

        {/* Feedback visual durante arrasto de arquivos */}
        {isDraggingOver && (
          <div className="absolute inset-0 z-20 bg-indigo-50/95 dark:bg-slate-900/95 backdrop-blur-xs flex flex-col items-center justify-center pointer-events-none p-6 text-center animate-in fade-in duration-100">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-2 shadow-lg shadow-indigo-600/30">
              <FileImage className="w-7 h-7" />
            </div>
            <p className="text-base font-bold text-indigo-950 dark:text-indigo-200">
              Solte as fotos das páginas aqui
            </p>
            <p className="text-xs font-medium text-indigo-700 dark:text-indigo-400">
              Adicionaremos automaticamente na sequência (até 30 páginas)
            </p>
          </div>
        )}

        <div className="p-3.5 sm:p-5 space-y-3">
          {/* Campo de Texto / Título / Objetivo do Estudo */}
          <div className="relative">
            <textarea
              value={studyTitle}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Conte o que você quer estudar ou envie as páginas do seu livro..."
              rows={hasPages ? 2 : 3}
              className="w-full resize-none bg-transparent text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none transition leading-relaxed font-normal"
            />
          </div>

          {/* Seção de Páginas Carregadas (Miniaturas e indicador de páginas) */}
          {hasPages && (
            <div className="border-t border-slate-100 dark:border-slate-800 pt-2">
              <UploadedPagesPreview
                pages={pages}
                draggedIndex={draggedIndex}
                onMovePage={onMovePage}
                onRotatePage={onRotatePage}
                onRemovePage={onRemovePage}
                onZoomPage={onZoomPage}
                onCardDragStart={onCardDragStart}
                onCardDragOver={onCardDragOver}
                onCardDragEnd={onCardDragEnd}
              />
            </div>
          )}

          {/* Estado de Processamento Simulado */}
          {isProcessing && (
            <div className="rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/80 dark:border-indigo-900/60 p-4 flex items-center gap-3 text-indigo-950 dark:text-indigo-200 animate-pulse">
              <Loader2 className="w-5 h-5 animate-spin text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div className="text-xs sm:text-sm font-semibold">
                {processingStep}
              </div>
            </div>
          )}

          {/* Estado de Sucesso: Mensagem de confirmação sem botões duplicados */}
          {isSubmitted && !isProcessing && (
            <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300/80 dark:border-emerald-800/60 p-4 animate-in fade-in duration-150">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-emerald-950 dark:text-emerald-100">
                    {STUDY_MESSAGES.PAGES_READY}
                  </h4>
                  <p className="text-xs text-emerald-900 dark:text-emerald-300 leading-relaxed font-medium">
                    O material foi organizado. Clique em Começar estudo para prosseguir.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Barra de Ações Inferior com apenas um botão principal e ação secundária */}
          <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            {/* Controles de Upload de Páginas */}
            <PageUploadControls
              fileInputRef={fileInputRef}
              cameraInputRef={cameraInputRef}
              hasPages={hasPages}
              onClearAll={onClearAll}
            />

            {/* Ações da direita: Ajustar sequência (secundária) + Começar estudo (principal) */}
            <div className="flex flex-wrap items-center justify-end gap-2">
              {/* Ação secundária quando já preparado */}
              {isSubmitted && !isProcessing && (
                <button
                  type="button"
                  onClick={onResetStudy}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200/90 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition cursor-pointer shadow-2xs"
                  title="Voltar e reorganizar as páginas"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Ajustar sequência</span>
                </button>
              )}

              {/* Único botão principal: Começar estudo */}
              <StudyActionButton
                hasPages={hasPages}
                isProcessing={isProcessing}
                isSubmitted={isSubmitted}
                createdStudyId={createdStudyId}
                onStartStudy={onStartStudy}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
