import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import { Materia } from "../types";
import { getStatus } from "../utils/statusRevisao";

export function useMaterias() {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [loadingIds, setLoadingIds] = useState<Set<number>>(new Set());

  const fetchMaterias = useCallback(async () => {
    try {
      setLoading(true);
      setErro(null);
      setMaterias(await api.getMaterias());
    } catch {
      setErro("Não foi possível carregar as matérias. Verifique se o servidor está rodando.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMaterias();
  }, [fetchMaterias]);

 
  const addLoadingId = (id: number) =>
    setLoadingIds((prev) => new Set(prev).add(id));

  const removeLoadingId = (id: number) =>
    setLoadingIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });

  const criarMateria = useCallback(async (nome: string) => {
    const hoje = new Date().toISOString().split("T")[0];
    const nova = await api.createMateria({ nome, ultimaRevisao: hoje });
    setMaterias((prev) => [...prev, nova]);
  }, []);

  const revisarMateria = useCallback(async (id: number) => {
    addLoadingId(id);
    try {
      const atualizada = await api.revisarMateria(id);
      setMaterias((prev) => prev.map((m) => (m.id === id ? atualizada : m)));
    } finally {
      removeLoadingId(id);
    }
  }, []);

  const deletarMateria = useCallback(async (id: number) => {
    addLoadingId(id);
    try {
      await api.deleteMateria(id);
      setMaterias((prev) => prev.filter((m) => m.id !== id));
    } finally {
      removeLoadingId(id);
    }
  }, []);

  const estatisticas = useMemo(() => ({
    total: materias.length,
    atrasadas: materias.filter((m) => getStatus(m.ultimaRevisao) === "atrasada").length,
    emDia: materias.filter((m) => getStatus(m.ultimaRevisao) === "em-dia").length,
  }), [materias]);

  return {
    materias,
    loading,
    erro,
    loadingIds,
    estatisticas,
    criarMateria,
    revisarMateria,
    deletarMateria,
    recarregar: fetchMaterias,
  };
}