# PRD — Foco no Concurso

## Visão Geral
Aplicação web para controle inteligente de horas de estudo voltada a candidatos de concurso público. Permite registrar sessões de estudo, cadastrar tópicos do edital com pesos e receber um plano do dia priorizado automaticamente.

## Problema
Quem estuda para concurso enquanto trabalha não consegue visualizar como o tempo está sendo distribuído entre as matérias. Semanas passam com foco excessivo em uma disciplina enquanto outras ficam sem atenção — e isso só aparece perto da prova.

## Solução
Interface simples para registrar sessões de estudo, cadastrar os tópicos do edital com seus pesos, e receber um plano do dia baseado no tempo disponível — priorizando o que está mais esquecido e o que mais cai na prova.

## Funcionalidades Principais
- Registro de sessões de estudo (matéria, duração, data, tipo e anotação)
- Cadastro de tópicos do edital com peso e status de conclusão
- Plano do dia gerado automaticamente por score (peso × urgência)
- Alertas de matérias esquecidas há mais de 7 dias
- Dashboard de resumo de horas por matéria
- Alternância de tipo de sessão (estudo ↔ revisão) via PATCH

## Tecnologias Utilizadas
- **Frontend:** React 19 + TypeScript 5.9 + Tailwind CSS v4 + Vite 8
- **API:** json-server 1.x (REST)
- **Deploy Frontend:** Vercel
- **Deploy API:** Railway

## Links
- 🔗 Repositório: https://github.com/Devezaa7/FocoNoConcurso
- 🌐 Frontend: [URL do Vercel aqui]
- ⚙️ API: [URL do Railway aqui]

## Arquitetura
- Custom Hooks (`useSessoes`, `useTopicos`) isolam toda a lógica de estado
- Camada de serviços (`services/`) centraliza todas as chamadas HTTP
- Algoritmo de priorização: score = peso do edital × fator de urgência por dias sem estudar

## Desenvolvedor
Guilhermy Deveza