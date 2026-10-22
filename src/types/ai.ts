import { AIStudyResult } from "./study";

export interface AIAnalysisRequest {
  title?: string;
  pages: Array<{
    id: string;
    name: string;
    pageNumber: number;
    base64Data?: string;
    mimeType?: string;
    rotation?: number;
  }>;
}

export interface IAIProvider {
  readonly providerName: string;

  analyzePages(request: AIAnalysisRequest): Promise<AIStudyResult>;
}

export interface AIProviderConfig {
  apiKey?: string;
  model?: string;
  providerType?: "mock" | "gemini";
}
