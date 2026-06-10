import { useState } from "react";

interface UseTopicosIAResult {
  topicos: string | null;
  carregando: boolean;
  buscarTopicos: (materia: string) => Promise<void>;
  limpar: () => void;
}

/**
 * Responsável por buscar os tópicos mais cobrados de uma matéria
 * via API da Anthropic. Isola toda a lógica de integração com IA
 * fora do componente de formulário.
 */
export function useTopicosIA(): UseTopicosIAResult {
  const [topicos, setTopicos] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function buscarTopicos(materia: string) {
    setCarregando(true);
    setTopicos(null);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.REACT_APP_ANTHROPIC_KEY || "",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 300,
          messages: [
            {
              role: "user",
              content: `Liste os 5 tópicos mais cobrados em concursos públicos brasileiros para "${materia}". Responda APENAS com os tópicos, um por linha, começando com "•". Sem introdução.`,
            },
          ],
        }),
      });

      const data = await response.json();
      const texto = data.content
        .filter((b: { type: string }) => b.type === "text")
        .map((b: { text: string }) => b.text)
        .join("");

      setTopicos(texto);
    } catch {
      setTopicos("Não foi possível carregar os tópicos agora.");
    } finally {
      setCarregando(false);
    }
  }

  function limpar() {
    setTopicos(null);
  }

  return { topicos, carregando, buscarTopicos, limpar };
}