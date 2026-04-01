import { CreateMateriaDTO, Materia } from "../types";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

export const api = {
  async getMaterias(): Promise<Materia[]> {
    const response = await fetch(`${BASE_URL}/materias`);
    if (!response.ok) throw new Error("Erro ao buscar materias");
    return response.json();
  },
  async createMateria(data: CreateMateriaDTO): Promise<Materia> {
    const response = await fetch(`${BASE_URL}/materias`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erro ao criar materia");
    return response.json();
  },
  async revisarMateria(id: number): Promise<Materia> {
    const hoje = new Date().toISOString().split("T")[0];
    const response = await fetch(`${BASE_URL}/materias/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ultimaRevisao: hoje }),
    });
    if (!response.ok) throw new Error("Erro ao revisar materia");
    return response.json();
  },
  async deleteMateria(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/materias/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erro ao deletar materia");
  },
};
