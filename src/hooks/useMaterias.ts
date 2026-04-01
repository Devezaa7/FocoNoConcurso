import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import { Materia, StatusRevisao } from "../types";

function getDias(ultimaRevisao: string): number {
  const hoje = new Date();
  const revisao = new Date(ultimaRevisao + "T00:00:00");
  return Math.floor((hoje.getTime() - revisao.getTime()) / (1000 * 60 * 60 * 24));
}

export function getStatus(ultimaRevisao: string): StatusRevisao {
  const dias = getDias(ultimaRevisao);
  if (dias <= 2) return "em-dia";
  if (dias <= 5) return "atencao";
  return "atrasada";
}

export function useMaterias() {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [loadingIds, setLoadingIds] = useState<Set<number>>(new Set());

  const fetchMaterias = useCallback(async () => {
    try {
      setLoading(true); setErro(null);
      setMaterias(await api.getMaterias());
    } catch {
      setErro("Nao foi possivel carregar as materias. Verifique se o servidor esta rodando.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMaterias(); }, [fetchMaterias]);

  const criarMateria = useCallback(async (nome: string) => {
    const hoje = new Date().toISOString().split("T")[0];
    const nova = await api.createMateria({ nome, ultimaRevisao: hoje });
    setMaterias((prev) => [...prev, nova]);
  }, []);

  const revisarMateria = useCallback(async (id: number) => {
    setLoadingIds((prev) => new Set(prev).add(id));
    try {
      const atualizada = await api.revisarMateria(id);
      setMaterias((prev) => prev.map((m) => (m.id === id ? atualizada : m)));
    } finally {
      setLoadingIds((prev) => { const n = new Set(prev); n.delete(id); return n; });
    }
  }, []);

  const deletarMateria = useCallback(async (id: number) => {
    setLoadingIds((prev) => new Set(prev).add(id));
    try {
      await api.deleteMateria(id);
      setMaterias((prev) => prev.filter((m) => m.id !== id));
    } finally {
      setLoadingIds((prev) => { const n = new Set(prev); n.delete(id); return n; });
    }
  }, []);

  const estatisticas = useMemo(() => ({
    total: materias.length,
    atrasadas: materias.filter((m) => getStatus(m.ultimaRevisao) === "atrasada").length,
    emDia: materias.filter((m) => getStatus(m.ultimaRevisao) === "em-dia").length,
  }), [materias]);

  return { materias, loading, erro, loadingIds, estatisticas, criarMateria, revisarMateria, deletarMateria };
}
