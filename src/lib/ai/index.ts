import { IAIProvider } from "@/types/ai";
import { MockAIProvider } from "./mock-provider";

let currentProvider: IAIProvider | null = null;

/**
 * Obtém a instância do provedor de IA configurado no backend.
 * As chaves e configurações permanecem isoladas no servidor.
 */
export function getAIProvider(): IAIProvider {
  if (currentProvider) {
    return currentProvider;
  }

  const providerType = process.env.AI_PROVIDER || "mock";

  switch (providerType.toLowerCase()) {
    case "gemini":
      // Preparado para receber a integração real do Gemini Flash na Etapa 2
      // Por enquanto, caso ainda não configurado, recorre com segurança ao MockProvider
      currentProvider = new MockAIProvider();
      break;
    case "mock":
    default:
      currentProvider = new MockAIProvider();
      break;
  }

  return currentProvider;
}

export * from "./mock-provider";
