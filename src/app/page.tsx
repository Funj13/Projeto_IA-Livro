"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  BookOpen,
  Upload,
  Camera,
  Trash2,
  RotateCw,
  ZoomIn,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileImage,
  Sparkles,
  AlertCircle,
  X,
  Plus,
  Layers,
  Cpu,
} from "lucide-react";

export interface BookPageImage {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
  sizeBytes: number;
  rotation: number; // 0, 90, 180, 270
  addedAt: number;
}

const WORDS_PER_PAGE_ESTIMATE = 350;
const TOKENS_PER_PAGE_ESTIMATE = 500;
const FREE_MODEL_MAX_PAGES = 1800; // Baseado no Gemini Flash Free Tier (~1M tokens)

export default function HomePage() {
  const [studyTitle, setStudyTitle] = useState("");
  const [pages, setPages] = useState<BookPageImage[]>([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeZoomPage, setActiveZoomPage] = useState<BookPageImage | null>(
    null
  );
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Processar novos arquivos recebidos via input, drag-and-drop ou Ctrl+V
  const addFiles = useCallback((fileList: FileList | File[]) => {
    setErrorMessage(null);
    setIsSubmitted(false);

    const incomingFiles = Array.from(fileList);
    const validImageFiles = incomingFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    if (validImageFiles.length === 0) {
      setErrorMessage(
        "Por favor, envie apenas arquivos de imagem (JPG, PNG, WEBP, HEIC)."
      );
      return;
    }

    if (validImageFiles.length < incomingFiles.length) {
      setErrorMessage(
        "Alguns arquivos foram ignorados porque não eram imagens."
      );
    }

    const newPageItems: BookPageImage[] = validImageFiles.map((file, idx) => ({
      id: `${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 8)}`,
      file,
      previewUrl: URL.createObjectURL(file),
      name: file.name || `pagina-${Date.now()}.png`,
      sizeBytes: file.size,
      rotation: 0,
      addedAt: Date.now() + idx,
    }));

    setPages((prev) => [...prev, ...newPageItems]);
  }, []);

  // Suporte para colar imagens com Ctrl+V direto na tela
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!e.clipboardData?.files?.length) return;
      addFiles(e.clipboardData.files);
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [addFiles]);

  // Limpar URLs criadas quando desmontar
  useEffect(() => {
    return () => {
      pages.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  };

  const removePage = (id: string) => {
    setIsSubmitted(false);
    setPages((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
    if (activeZoomPage?.id === id) {
      setActiveZoomPage(null);
    }
  };

  const clearAllPages = () => {
    pages.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    setPages([]);
    setIsSubmitted(false);
    setErrorMessage(null);
  };

  const rotatePage = (id: string) => {
    setPages((prev) =>
      prev.map((page) =>
        page.id === id
          ? { ...page, rotation: (page.rotation + 90) % 360 }
          : page
      )
    );
    setActiveZoomPage((prev) =>
      prev && prev.id === id
        ? { ...prev, rotation: (prev.rotation + 90) % 360 }
        : prev
    );
  };

  const movePage = (index: number, direction: "left" | "right") => {
    setIsSubmitted(false);
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= pages.length) return;

    setPages((prev) => {
      const copy = [...prev];
      const [item] = copy.splice(index, 1);
      copy.splice(targetIndex, 0, item);
      return copy;
    });
  };

  // Drag and drop para reordenar cards das páginas
  const handleCardDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleCardDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    setPages((prev) => {
      const copy = [...prev];
      const [draggedItem] = copy.splice(draggedIndex, 1);
      copy.splice(index, 0, draggedItem);
      return copy;
    });
    setDraggedIndex(index);
  };

  const handleCardDragEnd = () => {
    setDraggedIndex(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(2)} MB`;
  };

  const totalSizeBytes = pages.reduce((acc, p) => acc + p.sizeBytes, 0);
  const estimatedWords = pages.length * WORDS_PER_PAGE_ESTIMATE;
  const estimatedTokens = pages.length * TOKENS_PER_PAGE_ESTIMATE;
  const memoryPercentage = Math.min(
    100,
    (pages.length / FREE_MODEL_MAX_PAGES) * 100
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Cabeçalho */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg tracking-tight text-white">
                  EstudaIA
                </h1>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  Protótipo • Etapa 1
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Envio e organização das páginas do livro
              </p>
            </div>
          </div>

          {/* Indicador das etapas futuras do projeto */}
          <div className="hidden md:flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-medium shadow-sm">
              1. Fotos das Páginas
            </span>
            <span className="text-slate-600">→</span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-slate-500 border border-slate-800">
              2. Leitura IA & Aula (Áudio/Vídeo)
            </span>
            <span className="text-slate-600">→</span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-slate-500 border border-slate-800">
              3. Quiz de Fixação
            </span>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Identificação opcional do estudo + Medidor de Capacidade */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bloco de Título do Capítulo/Livro */}
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
                value={studyTitle}
                onChange={(e) => setStudyTitle(e.target.value)}
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
              <span>Formatos aceitos: JPG, PNG, WEBP</span>
            </div>
          </div>

          {/* Medidor de Memória da IA Grátis */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <Cpu className="w-4 h-4" />
                Memória da IA (Plano Grátis)
              </span>
              <span className="text-xs text-slate-400">
                {pages.length} / {FREE_MODEL_MAX_PAGES} págs
              </span>
            </div>

            <div className="my-3 space-y-2">
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
                  style={{
                    width: `${
                      pages.length === 0 ? 0 : Math.max(2, memoryPercentage)
                    }%`,
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-2.5">
                  <p className="text-[11px] text-slate-400">
                    Palavras estimadas
                  </p>
                  <p className="text-sm font-semibold text-white">
                    ~{estimatedWords.toLocaleString("pt-BR")}
                  </p>
                </div>
                <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-2.5">
                  <p className="text-[11px] text-slate-400">Peso total</p>
                  <p className="text-sm font-semibold text-white">
                    {formatFileSize(totalSizeBytes)}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Cada página equivale a ~350 palavras (~{estimatedTokens.toLocaleString("pt-BR")}{" "}
              tokens no total).
            </p>
          </div>
        </div>

        {/* Mensagem de erro caso envie arquivo inválido */}
        {errorMessage && (
          <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-red-400 hover:text-red-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Área de Upload (Drag & Drop) */}
        <section
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
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
                addFiles(e.target.files);
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
                addFiles(e.target.files);
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
              Selecione várias fotos de uma vez na ordem do capítulo ou tire
              foto direto com a câmera.
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

        {/* Lista / Grade de Páginas Enviadas */}
        {pages.length > 0 && (
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <Layers className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  Páginas do Livro ({pages.length})
                </h3>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  • Arraste os cartões ou use as setas para ajustar a ordem de
                  leitura
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Adicionar mais páginas
                </button>

                <button
                  type="button"
                  onClick={clearAllPages}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20 text-xs font-medium transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Limpar tudo
                </button>
              </div>
            </div>

            {/* Grade de Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {pages.map((page, index) => (
                <div
                  key={page.id}
                  draggable
                  onDragStart={() => handleCardDragStart(index)}
                  onDragOver={(e) => handleCardDragOver(e, index)}
                  onDragEnd={handleCardDragEnd}
                  className={`group relative rounded-2xl bg-slate-900 border transition-all overflow-hidden flex flex-col ${
                    draggedIndex === index
                      ? "border-indigo-400 opacity-50 scale-95"
                      : "border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {/* Cabeçalho do Card com número da página */}
                  <div className="px-3.5 py-2.5 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 bg-indigo-500/15 border border-indigo-500/30 px-2.5 py-0.5 rounded-md">
                      Página {index + 1}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => movePage(index, "left")}
                        disabled={index === 0}
                        title="Mover página para trás"
                        className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-25 disabled:pointer-events-none transition"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => movePage(index, "right")}
                        disabled={index === pages.length - 1}
                        title="Mover página para frente"
                        className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-25 disabled:pointer-events-none transition"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Miniatura da Imagem */}
                  <div
                    onClick={() => setActiveZoomPage(page)}
                    className="relative aspect-[3/4] w-full bg-slate-950 flex items-center justify-center overflow-hidden cursor-zoom-in"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={page.previewUrl}
                      alt={`Página ${index + 1} - ${page.name}`}
                      style={{ transform: `rotate(${page.rotation}deg)` }}
                      className="w-full h-full object-contain transition-transform duration-200"
                    />

                    {/* Overlay ao passar o mouse */}
                    <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 text-white text-xs font-medium border border-slate-700 shadow">
                        <ZoomIn className="w-3.5 h-3.5 text-indigo-400" />
                        Ampliar
                      </span>
                    </div>
                  </div>

                  {/* Rodapé com metadados e ações (Girar / Excluir) */}
                  <div className="p-3 bg-slate-900 flex items-center justify-between gap-2 mt-auto border-t border-slate-800/80">
                    <div className="truncate">
                      <p
                        className="text-xs font-medium text-slate-200 truncate"
                        title={page.name}
                      >
                        {page.name}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {formatFileSize(page.sizeBytes)}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => rotatePage(page.id)}
                        title="Girar foto em 90°"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removePage(page.id)}
                        title="Remover página"
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Barra de Conclusão / Confirmação das Fotos */}
            <div className="mt-8 rounded-2xl bg-gradient-to-r from-indigo-950/70 via-slate-900 to-slate-900 border border-indigo-500/30 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-base font-semibold text-white flex items-center justify-center sm:justify-start gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  Tudo pronto com as fotos?
                </h4>
                <p className="text-xs text-slate-300">
                  {pages.length}{" "}
                  {pages.length === 1
                    ? "página selecionada"
                    : "páginas selecionadas"}{" "}
                  na sequência correta (~{estimatedWords.toLocaleString("pt-BR")}{" "}
                  palavras estimadas).
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsSubmitted(true)}
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
                        {studyTitle.trim()
                          ? `"${studyTitle.trim()}"`
                          : "Sem título"}
                      </strong>{" "}
                      com <strong>{pages.length} página(s)</strong> ({formatFileSize(totalSizeBytes)}) está pronto. Na próxima etapa do projeto, conectaremos este lote à IA gratuita para extrair o texto, gerar o áudio/vídeo explicativo e montar o quiz!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
      </main>

      {/* Modal de Zoom para inspecionar legibilidade da página */}
      {activeZoomPage && (
        <div
          onClick={() => setActiveZoomPage(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
          >
            <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 truncate">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Página{" "}
                  {pages.findIndex((p) => p.id === activeZoomPage.id) + 1}
                </span>
                <span className="text-sm text-slate-200 truncate">
                  {activeZoomPage.name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => rotatePage(activeZoomPage.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  Girar 90°
                </button>
                <button
                  type="button"
                  onClick={() => setActiveZoomPage(null)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-6 flex items-center justify-center bg-slate-950/60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeZoomPage.previewUrl}
                alt={activeZoomPage.name}
                style={{ transform: `rotate(${activeZoomPage.rotation}deg)` }}
                className="max-h-[75vh] w-auto object-contain rounded-lg transition-transform duration-200"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
