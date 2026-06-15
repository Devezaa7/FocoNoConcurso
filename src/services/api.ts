// ✅ RPI — Responsabilidade única: só HTTP, sem lógica de negócio
// Melhoria: erro tratado em um único lugar com handleResponse()
// Antes: cada método repetia "if (!response.ok) throw new Error(...)"

import { CreateMateriaDTO, Materia } from "../types";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

// ✅ Função auxiliar privada — elimina a repetição do if(!response.ok)
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const msg = await response.text().catch(() => response.statusText);
    throw new Error(msg || `Erro HTTP ${response.status}`);
  }
  return response.json();
}

export const api = {
  async getMaterias(): Promise<Materia[]> {
    const res = await fetch(`${BASE_URL}/materias`);
    return handleResponse<Materia[]>(res);
  },

  async createMateria(data: CreateMateriaDTO): Promise<Materia> {
    const res = await fetch(`${BASE_URL}/materias`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<Materia>(res);
  },

  async revisarMateria(id: number): Promise<Materia> {
    const hoje = new Date().toISOString().split("T")[0];
    const res = await fetch(`${BASE_URL}/materias/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ultimaRevisao: hoje }),
    });
    return handleResponse<Materia>(res);
  },

  async deleteMateria(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/materias/${id}`, { method: "DELETE" });
    await handleResponse<void>(res);
  },
};