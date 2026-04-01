export interface Materia {
  id: number;
  nome: string;
  ultimaRevisao: string;
}

export interface CreateMateriaDTO {
  nome: string;
  ultimaRevisao: string;
}

export type StatusRevisao = "em-dia" | "atencao" | "atrasada";
