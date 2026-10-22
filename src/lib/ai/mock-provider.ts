import { IAIProvider, AIAnalysisRequest } from "@/types/ai";
import { AIStudyResult } from "@/types/study";

export class MockAIProvider implements IAIProvider {
  readonly providerName = "MockProvider";

  async analyzePages(request: AIAnalysisRequest): Promise<AIStudyResult> {
    // Simula uma latência de processamento
    await new Promise((resolve) => setTimeout(resolve, 800));

    const title = request.title?.trim() || "Estudo sem título";
    const totalPages = request.pages.length;

    return {
      studyTitle: title,
      pageCount: totalPages,
      extractedMarkdown: `# ${title}\n\nConteúdo simulado extraído com sucesso de ${totalPages} página(s).\n\n- Conceito 1: Introdução ao tema\n- Conceito 2: Análise detalhada\n- Conceito 3: Conclusões práticas`,
      lecture: {
        title: `Aula Didática: ${title}`,
        summary: `Resumo explicativo abrangendo as ${totalPages} página(s) analisadas no lote de estudo.`,
        script: `Olá! Vamos iniciar a revisão do capítulo sobre ${title}. Ao longo das páginas enviadas, os pontos centrais abordam definições fundamentais e suas aplicações práticas.`,
        slides: request.pages.map((page, index) => ({
          pageNumber: index + 1,
          title: `Tópico ${index + 1}: ${page.name}`,
          content: `Síntese dos tópicos destacados na página ${index + 1} do material de estudo.`,
          keyPoints: [
            "Definição do conceito central",
            "Exemplo aplicado ao cotidiano",
            "Ponto de atenção para fixação",
          ],
        })),
      },
      quiz: [
        {
          id: "q1",
          question: `Qual é o objetivo principal abordado no material de "${title}"?`,
          options: [
            "Introduzir e estruturar os conceitos fundamentais do capítulo",
            "Descartar fórmulas e focar apenas em opiniões pessoais",
            "Apresentar fatos históricos sem conexão com a matéria",
            "Substituir a bibliografia obrigatória por leitura livre",
          ],
          answerIndex: 0,
          explanation:
            "O capítulo estrutura os fundamentos essenciais e estabelece a base teórica para o aprendizado.",
          pageReference: 1,
        },
        {
          id: "q2",
          question:
            "De acordo com a síntese das páginas, qual recomendação prática deve ser adotada?",
          options: [
            "Ignorar exercícios de fixação",
            "Revisar os tópicos-chave e associá-los a exemplos reais",
            "Memorizar dados sem entender o contexto",
            "Interromper o estudo antes de concluir os tópicos principais",
          ],
          answerIndex: 1,
          explanation:
            "A revisão dos tópicos-chave com exemplos do dia a dia consolida a retenção na memória.",
          pageReference: Math.min(2, totalPages),
        },
      ],
      processedAt: new Date().toISOString(),
    };
  }
}
