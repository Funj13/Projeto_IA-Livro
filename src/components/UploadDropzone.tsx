"use client";

import React, { RefObject } from "react";
import { Upload, FileImage, Camera } from "lucide-react";

interface UploadDropzoneProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  cameraInputRef: RefObject<HTMLInputElement | null>;
  isDraggingOver: boolean;
  onFilesSelected: (files: FileList | File[]) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

export function UploadDropzone({
  fileInputRef,
  cameraInputRef,
  isDraggingOver,
  onFilesSelected,
  onDragOver,
  onDragLeave,
  onDrop,
}: UploadDropzoneProps) {
  return (
    <section
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`relative rounded-2xl border-2 border-dashed transition-all p-8 sm:p-10 text-center ${
        isDraggingOver
          ? "border-indigo-400 bg-indigo-500/10 scale-[1.01]"
          : "border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60"
      }`}
    >
      {/* Inputs ocultos */}
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

      <div className="max-w-md mx-auto flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 shadow-inner">
          <Upload className="w-8 h-8" />
        </div>

        <h2 className="text-lg sm:text-xl font-semibold text-white mb-1">
          Arraste e solte as fotos das páginas aqui
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          Selecione várias fotos de uma vez na ordem do capítulo ou tire foto
          direto com a câmera.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm shadow-lg shadow-indigo-600/25 transition cursor-pointer"
          >
            <FileImage className="w-4 h-4" />
            Escolher Fotos do Dispositivo
          </button>

          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-sm transition cursor-pointer"
          >
            <Camera className="w-4 h-4 text-indigo-400" />
            Tirar Foto Agora
          </button>
        </div>
      </div>
    </section>
  );
}
