import {
  WORDS_PER_PAGE_ESTIMATE,
  TOKENS_PER_PAGE_ESTIMATE,
  FREE_MODEL_MAX_PAGES,
} from "./constants";
import { StudyMetrics } from "@/types";

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

export function calculateStudyMetrics(
  pagesCount: number,
  totalSizeBytes: number
): StudyMetrics {
  const estimatedWords = pagesCount * WORDS_PER_PAGE_ESTIMATE;
  const estimatedTokens = pagesCount * TOKENS_PER_PAGE_ESTIMATE;
  const memoryPercentage = Math.min(
    100,
    (pagesCount / FREE_MODEL_MAX_PAGES) * 100
  );

  return {
    totalPages: pagesCount,
    totalSizeBytes,
    estimatedWords,
    estimatedTokens,
    memoryPercentage,
  };
}
