"use client";

import React from "react";
import { AlertCircle, X } from "lucide-react";

interface ErrorMessageProps {
  message: string | null;
  onDismiss: () => void;
}

export function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
      <div className="flex items-center gap-2.5">
        <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
        <span>{message}</span>
      </div>
      <button
        onClick={onDismiss}
        className="text-red-400 hover:text-red-200 transition"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
