// ✅ RPI — Responsabilidade única: isolamento da integração com IA
// Melhorias: useCallback nas funções, erro tipado, model atualizado

import { useCallback, useState } from "react";

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";

interface TopicosState {
  topicos: string | null;
  carregando: boolean;
  erro: string | null; // ✅ NOVO — erro separado do conteúdo
}

export function useTopicosIA() {
  const [state, setState] = useState<TopicosState>({
    topicos: null,
    carregando: false,
    erro: null,
  });

  // ✅ useCallback — não recria a função a cada render
  const buscarTopicos = useCallback(async (materia: string) => {
    setState({ topicos: null, carregando: true, erro: null });

    try {
      const response = await fetch(ANTHROPIC_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.REACT_APP_ANTHROPIC_KEY || "",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6", // ✅ model atualizado
          max_tokens: 300,
          messages: [
            {
              role: "user",
              content: `Liste os 5 tópicos mais cobrados em concursos públicos brasileiros para "${materia}". Responda APENAS com os tópicos, um por linha, começando com "•". Sem introdução.`,
            },
          ],
        }),
      });

      if (!response.ok) throw new Error(`Erro HTTP ${response.status}`);

      const data = await response.json();
      const texto: string = data.content
        .filter((b: { type: string }) => b.type === "text")
        .map((b: { text: string }) => b.text)
        .join("");

      setState({ topicos: texto, carregando: false, erro: null });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erro desconhecido";
      setState({ topicos: null, carregando: false, erro: msg });
    }
  }, []);

  const limpar = useCallback(() => {
    setState({ topicos: null, carregando: false, erro: null });
  }, []);

  return { ...state, buscarTopicos, limpar };
}