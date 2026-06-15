export interface Materia {
  id: number;
  nome: string;
  ultimaRevisao: string; // formato ISO: "YYYY-MM-DD"
}

export interface CreateMateriaDTO {
  nome: string;
  ultimaRevisao: string;
}

export type StatusRevisao = "em-dia" | "atencao" | "atrasada";

export interface RegraStatus {
  diasMaxEmDia: number;
  diasMaxAtencao: number;
}

export const REGRA_PADRAO: RegraStatus = {
  diasMaxEmDia: 2,
  diasMaxAtencao: 5,
};