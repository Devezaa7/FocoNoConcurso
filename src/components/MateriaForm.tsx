import React, { useRef, useState, useMemo } from "react";

interface Props {
  onCriar: (nome: string) => Promise<void>;
}

const MATERIAS = [
  "Lingua Portuguesa","Matematica","Raciocinio Logico",
  "Direito Constitucional","Direito Administrativo","Direito Penal",
  "Direito Civil","Direito do Trabalho","Direito Processual Civil",
  "Direito Processual Penal","Legislacao Especifica","Conhecimentos Gerais",
  "Atualidades","Informatica","Administracao Publica","Contabilidade",
  "Economia","Estatistica","Geografia do Brasil","Historia do Brasil",
  "Etica no Servico Publico","Legislacao de Transito","Nocoes de Bombeiro",
  "Primeiros Socorros","Defesa Civil","Direitos Humanos","Seguranca Publica",
  "Legislacao Ambiental","Normas de Trabalho Embarcado","Ingles Tecnico",
];

export function MateriaForm({ onCriar }: Props) {
  const [nome, setNome] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
  const [topicos, setTopicos] = useState<string | null>(null);
  const [carregandoTopicos, setCarregandoTopicos] = useState(false);
  const [materiaSelecionada, setMateriaSelecionada] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sugestoes = useMemo(() => {
    if (nome.trim().length < 2) return [];
    return MATERIAS.filter((m) => m.toLowerCase().includes(nome.toLowerCase())).slice(0, 6);
  }, [nome]);

  async function selecionarSugestao(materia: string) {
    setNome(materia);
    setMostrarSugestoes(false);
    setMateriaSelecionada(materia);
    setCarregandoTopicos(true);
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
          model: "claude-sonnet-4-6",
          max_tokens: 300,
          messages: [{ role: "user", content: `Liste os 5 topicos mais cobrados em concursos publicos brasileiros para "${materia}". Responda APENAS com os topicos, um por linha, comecando com "•". Sem introducao.` }],
        }),
      });
      const data = await response.json();
      setTopicos(data.content.filter((b: {type:string}) => b.type === "text").map((b: {text:string}) => b.text).join(""));
    } catch {
      setTopicos("Nao foi possivel carregar os topicos agora.");
    } finally {
      setCarregandoTopicos(false);
      inputRef.current?.focus();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nomeTrimado = nome.trim();
    if (!nomeTrimado) return;
    setSalvando(true);
    try {
      await onCriar(nomeTrimado);
      setNome(""); setTopicos(null); setMateriaSelecionada(null);
      inputRef.current?.focus();
    } finally { setSalvando(false); }
  }

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="materia-form">
        <div className="input-wrapper">
          <input
            ref={inputRef} type="text" value={nome}
            onChange={(e) => { setNome(e.target.value); setMostrarSugestoes(true); setTopicos(null); setMateriaSelecionada(null); }}
            onFocus={() => setMostrarSugestoes(true)}
            onBlur={() => setTimeout(() => setMostrarSugestoes(false), 150)}
            placeholder="Ex: Direito Constitucional..."
            disabled={salvando} maxLength={80} className="form-input" autoComplete="off"
          />
          {mostrarSugestoes && sugestoes.length > 0 && (
            <ul className="autocomplete-lista">
              {sugestoes.map((s) => (
                <li key={s} className="autocomplete-item" onMouseDown={() => selecionarSugestao(s)}>
                  <span className="autocomplete-icone">📚</span>{s}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit" disabled={salvando || !nome.trim()} className="btn-primary">
          {salvando ? "Salvando..." : "+ Adicionar"}
        </button>
      </form>
      {materiaSelecionada && (
        <div className="topicos-box">
          <p className="topicos-titulo">🤖 Topicos mais cobrados em <strong>{materiaSelecionada}</strong>:</p>
          {carregandoTopicos
            ? <div className="topicos-loading"><span className="spinner-inline" /><span>Consultando IA...</span></div>
            : <p className="topicos-conteudo">{topicos}</p>
          }
        </div>
      )}
    </div>
  );
}
