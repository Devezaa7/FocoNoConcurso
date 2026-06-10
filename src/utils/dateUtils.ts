/**
 * Retorna o número de dias desde uma data ISO (YYYY-MM-DD) até hoje.
 */
export function diasDesde(dataISO: string): number {
  const hoje = new Date();
  const data = new Date(dataISO + "T00:00:00");
  return Math.floor((hoje.getTime() - data.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * Formata uma data ISO (YYYY-MM-DD) para o formato brasileiro (DD/MM/AAAA).
 */
export function formatarData(dataISO: string): string {
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}