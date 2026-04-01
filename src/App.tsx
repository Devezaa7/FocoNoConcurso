import { useState } from "react";
import "./App.css";
import { EmptyState } from "./components/EmptyState";
import { MateriaCard } from "./components/MateriaCard";
import { MateriaForm } from "./components/MateriaForm";
import { PlanoEstudosModal } from "./components/PlanoEstudosModal";
import { useMaterias } from "./hooks/useMaterias";

export default function App() {
  const { materias, loading, erro, loadingIds, estatisticas, criarMateria, revisarMateria, deletarMateria } = useMaterias();
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🎯</span>
            <div><h1>Foco no Concurso</h1><p>Seu controle de revisoes</p></div>
          </div>
          {!loading && !erro && materias.length > 0 && (
            <div className="stats">
              <div className="stat"><span className="stat-num">{estatisticas.total}</span><span className="stat-label">Materias</span></div>
              <div className="stat stat-alert"><span className="stat-num">{estatisticas.atrasadas}</span><span className="stat-label">Atrasadas</span></div>
              <div className="stat stat-ok"><span className="stat-num">{estatisticas.emDia}</span><span className="stat-label">Em dia</span></div>
            </div>
          )}
        </div>
      </header>

      <main className="app-main">
        <section className="form-section">
          <h2>Adicionar Materia</h2>
          <MateriaForm onCriar={criarMateria} />
        </section>
        <section className="list-section">
          <h2>Suas Materias</h2>
          {loading && <div className="loading"><div className="spinner" /><p>Carregando...</p></div>}
          {erro && <div className="erro-box"><span>⚠️</span><p>{erro}</p></div>}
          {!loading && !erro && materias.length === 0 && <EmptyState />}
          {!loading && !erro && materias.length > 0 && (
            <div className="materias-grid">
              {materias.map((m) => (
                <MateriaCard key={m.id} materia={m} carregando={loadingIds.has(m.id)} onRevisar={revisarMateria} onDeletar={deletarMateria} />
              ))}
            </div>
          )}
        </section>
      </main>

      <div className="btn-ia-wrapper">
        <button onClick={() => setModalAberto(true)} className="btn-ia-destaque">🤖 Plano de Estudos com IA</button>
        <p className="btn-ia-legenda">Monte seu cronograma personalizado em segundos</p>
      </div>

      <footer className="app-footer">
        <p>Foco no Concurso · Sua aprovacao comeca com organizacao 💪</p>
      </footer>

      {modalAberto && <PlanoEstudosModal onFechar={() => setModalAberto(false)} />}
    </div>
  );
}
