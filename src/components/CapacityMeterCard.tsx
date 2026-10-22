"use client";

import React from "react";
import { Cpu } from "lucide-react";
import { FREE_MODEL_MAX_PAGES } from "@/lib/constants";
import { StudyMetrics } from "@/types/study";
import { formatFileSize } from "@/lib/utils";

interface CapacityMeterCardProps {
  metrics: StudyMetrics;
}

export function CapacityMeterCard({ metrics }: CapacityMeterCardProps) {
  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
          <Cpu className="w-4 h-4" />
          Memória da IA (Plano Grátis)
        </span>
        <span className="text-xs text-slate-400">
          {metrics.totalPages} / {FREE_MODEL_MAX_PAGES} págs
        </span>
      </div>

      <div className="my-3 space-y-2">
        <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
            style={{
              width: `${
                metrics.totalPages === 0
                  ? 0
                  : Math.max(2, metrics.memoryPercentage)
              }%`,
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-2.5">
            <p className="text-[11px] text-slate-400">Palavras estimadas</p>
            <p className="text-sm font-semibold text-white">
              ~{metrics.estimatedWords.toLocaleString("pt-BR")}
            </p>
          </div>
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-2.5">
            <p className="text-[11px] text-slate-400">Peso total</p>
            <p className="text-sm font-semibold text-white">
              {formatFileSize(metrics.totalSizeBytes)}
            </p>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-slate-400 leading-relaxed">
        Cada página equivale a ~350 palavras (~
        {metrics.estimatedTokens.toLocaleString("pt-BR")} tokens no total).
      </p>
    </div>
  );
}
