import React, { useState } from "react";

interface Props { onFechar: () => void; }
interface FormData {
  horasPorDia: string;
  diasDisponiveis: string;
  dataProva: string;
  edital: string;
}

export function PlanoEstudosModal({ onFechar }: Props) {
  const [form, setForm] = useState<FormData>({
    horasPorDia: "",
    diasDisponiveis: "",
    dataProva: "",
    edital: "",
  });
  const [plano, setPlano] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const chaveAPI = process.env.REACT_APP_ANTHROPIC_KEY;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function gerarPlano() {
    // Valida se a chave existe
    if (!chaveAPI || chaveAPI.trim() === "") {
      setErro(
        "Chave da API não encontrada. Crie o arquivo .env na raiz do projeto com: REACT_APP_ANTHROPIC_KEY=sk-ant-..."
      );
      return;
    }

    const { horasPorDia, diasDisponiveis, dataProva, edital } = form;

    if (!horasPorDia || !diasDisponiveis || !dataProva || !edital.trim()) {
      setErro("Preencha todos os campos antes de gerar o plano.");
      return;
    }

    setErro(null);
    setCarregando(true);
    setPlano("");

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": chaveAPI,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1500,
          messages: [
            {
              role: "user",
              content: `Você é especialista em concursos públicos brasileiros. Crie um plano de estudos detalhado com as informações abaixo:

- Horas disponíveis por dia: ${horasPorDia}h
- Dias de estudo por semana: ${diasDisponiveis}
- Data da prova: ${dataProva}
- Matérias do edital: ${edital}

Monte o plano com os seguintes tópicos:
# Resumo Geral
# Prioridade das Matérias
# Cronograma Semanal
# Dicas Práticas

Seja objetivo e prático. Use listas quando possível.`,
            },
          ],
        }),
      });

      // Trata erros HTTP
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const mensagem =
          (errorData as { error?: { message?: string } })?.error?.message ||
          `Erro HTTP ${response.status}: ${response.statusText}`;
        throw new Error(mensagem);
      }

      const data = await response.json();

      // Extrai o texto da resposta
      const textoResposta = data.content
        .filter((b: { type: string }) => b.type === "text")
        .map((b: { text: string }) => b.text)
        .join("\n");

      if (!textoResposta) {
        throw new Error("A IA retornou uma resposta vazia. Tente novamente.");
      }

      setPlano(textoResposta);
    } catch (err) {
      if (err instanceof TypeError && err.message.includes("fetch")) {
        setErro(
          "Erro de conexão. Verifique sua internet ou se a API está bloqueada por CORS."
        );
      } else {
        setErro(
          err instanceof Error ? err.message : "Erro inesperado. Tente novamente."
        );
      }
    } finally {
      setCarregando(false);
    }
  }

  function formatarPlano(texto: string) {
    return texto.split("\n").map((linha, i) => {
      if (linha.startsWith("## "))
        return (
          <h3 key={i} className="plano-h3">
            {linha.replace("## ", "")}
          </h3>
        );
      if (linha.startsWith("# "))
        return (
          <h2 key={i} className="plano-h2">
            {linha.replace("# ", "")}
          </h2>
        );
      if (linha.startsWith("- ") || linha.startsWith("• "))
        return (
          <li key={i} className="plano-li">
            {linha.replace(/^[-•] /, "")}
          </li>
        );
      if (linha.trim() === "") return <br key={i} />;
      return (
        <p key={i} className="plano-p">
          {linha}
        </p>
      );
    });
  }

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onFechar()}
    >
      <div className="modal-box">
        <div className="modal-header">
          <div className="modal-titulo">
            <span>🤖</span>
            <div>
              <h2>Plano de Estudos com IA</h2>
              <p>Preencha os campos e receba um plano personalizado</p>
            </div>
          </div>
          <button onClick={onFechar} className="modal-fechar">
            ✕
          </button>
        </div>

        <div className="modal-corpo">
          {/* Aviso se a chave não estiver configurada */}
          {!chaveAPI && (
            <div className="erro-box" style={{ marginBottom: "1rem" }}>
              <span>⚠️</span>
              <p>
                <strong>Chave da API não configurada.</strong> Crie o arquivo{" "}
                <code>.env</code> na raiz do projeto com:{" "}
                <code>REACT_APP_ANTHROPIC_KEY=sk-ant-...</code> e reinicie o
                servidor.
              </p>
            </div>
          )}

          {!plano && (
            <div className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Horas por dia</label>
                  <select
                    name="horasPorDia"
                    value={form.horasPorDia}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Selecione...</option>
                    {["1", "2", "3", "4", "5", "6"].map((h) => (
                      <option key={h} value={h}>
                        {h}h/dia
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Dias por semana</label>
                  <select
                    name="diasDisponiveis"
                    value={form.diasDisponiveis}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Selecione...</option>
                    {["2", "3", "4", "5", "6"].map((d) => (
                      <option key={d} value={d}>
                        {d} dias
                      </option>
                    ))}
                    <option value="7">Todos os dias</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Data da prova</label>
                <input
                  type="date"
                  name="dataProva"
                  value={form.dataProva}
                  onChange={handleChange}
                  className="form-input"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="form-group">
                <label>Matérias do edital</label>
                <textarea
                  name="edital"
                  value={form.edital}
                  onChange={handleChange}
                  placeholder={
                    "Ex:\n- Língua Portuguesa (20 questões)\n- Matemática (15 questões)\n- Direito Constitucional (10 questões)"
                  }
                  className="form-input form-textarea"
                  rows={6}
                />
              </div>

              {erro && (
                <div className="erro-box">
                  <span>⚠️</span>
                  <p>{erro}</p>
                </div>
              )}

              <button
                onClick={gerarPlano}
                disabled={carregando || !chaveAPI}
                className="btn-gerar"
              >
                {carregando ? (
                  <>
                    <span className="spinner-inline" /> Gerando seu plano...
                  </>
                ) : (
                  "✨ Gerar Plano de Estudos"
                )}
              </button>
            </div>
          )}

          {plano && (
            <div className="plano-resultado">
              <div className="plano-conteudo">{formatarPlano(plano)}</div>
              <div className="plano-acoes">
                <button onClick={() => setPlano("")} className="btn-secondary">
                  ← Novo plano
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(plano);
                    alert("Copiado!");
                  }}
                  className="btn-primary"
                >
                  📋 Copiar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}