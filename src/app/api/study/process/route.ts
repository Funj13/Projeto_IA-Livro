import { NextRequest, NextResponse } from "next/server";
import { getAIProvider } from "@/lib/ai";
import { AIAnalysisRequest } from "@/types/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, pages } = body as AIAnalysisRequest;

    if (!pages || !Array.isArray(pages) || pages.length === 0) {
      return NextResponse.json(
        { error: "Nenhuma página foi fornecida para processamento." },
        { status: 400 }
      );
    }

    const provider = getAIProvider();
    const result = await provider.analyzePages({
      title: title || "Estudo sem título",
      pages,
    });

    return NextResponse.json({
      success: true,
      provider: provider.providerName,
      result,
    });
  } catch (error) {
    console.error("[API Error] Falha ao processar estudo:", error);
    return NextResponse.json(
      { error: "Erro interno ao processar as páginas do livro." },
      { status: 500 }
    );
  }
}
