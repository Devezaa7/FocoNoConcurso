import { getStatus } from "../hooks/useMaterias";
import { diasDesde, formatarData } from "../utils/dateUtils";
import { Materia } from "../types";

interface Props {
  materia: Materia;
  carregando: boolean;
  onRevisar: (id: number) => void;
  onDeletar: (id: number) => void;
}

const STATUS_CONFIG = {
  "em-dia":  { label: "Em dia ✓",       className: "status-em-dia" },
  atencao:   { label: "Atencao ⚠",      className: "status-atencao" },
  atrasada:  { label: "Revisar ja! 🔴", className: "status-atrasada" },
};

function descricaoDias(dias: number): string {
  if (dias === 0) return "Revisado hoje";
  if (dias === 1) return "Ha 1 dia";
  return `Ha ${dias} dias`;
}

export function MateriaCard({ materia, carregando, onRevisar, onDeletar }: Props) {
  const status = getStatus(materia.ultimaRevisao);
  const config = STATUS_CONFIG[status];
  const dias = diasDesde(materia.ultimaRevisao);

  return (
    <div className={`materia-card ${config.className}`}>
      <div className="card-header">
        <h3 className="card-nome">{materia.nome}</h3>
        <span className={`status-badge ${config.className}`}>{config.label}</span>
      </div>
      <p className="card-info">
        Ultima revisao: <strong>{formatarData(materia.ultimaRevisao)}</strong>
        {" · "}
        {descricaoDias(dias)}
      </p>
      <div className="card-actions">
        <button onClick={() => onRevisar(materia.id)} disabled={carregando} className="btn-revisar">
          {carregando ? "..." : "✓ Revisei hoje"}
        </button>
        <button onClick={() => onDeletar(materia.id)} disabled={carregando} className="btn-deletar">
          Remover
        </button>
      </div>
    </div>
  );
}