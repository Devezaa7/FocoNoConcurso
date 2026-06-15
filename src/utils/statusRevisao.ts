import { diasDesde } from "./dateUtils";
import { RegraStatus, REGRA_PADRAO, StatusRevisao } from "../types";

export function getStatus(
  ultimaRevisao: string,
  regra: RegraStatus = REGRA_PADRAO
): StatusRevisao {
  const dias = diasDesde(ultimaRevisao);
  if (dias <= regra.diasMaxEmDia) return "em-dia";
  if (dias <= regra.diasMaxAtencao) return "atencao";
  return "atrasada";
}