<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=32&duration=3000&pause=1000&color=1E40AF&center=true&vCenter=true&width=600&lines=🎯+Foco+no+Concurso;Sua+aprovação+começa+aqui!" alt="Typing SVG" />

<br/>

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![JSON Server](https://img.shields.io/badge/JSON_Server-API_REST-brightgreen?style=for-the-badge)
![Claude AI](https://img.shields.io/badge/Claude_AI-Anthropic-D97706?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Online-success?style=for-the-badge)

<br/>

> **Aplicação web para controle de revisões de matérias de concursos públicos.**  
> Nunca mais esqueça o que precisa estudar. 🧠

<br/>

[🚀 Ver Demo](#) · [📋 Reportar Bug](#) · [💡 Sugerir Feature](#)

</div>

---

## 📌 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [O Problema](#-o-problema)
- [A Solução](#-a-solução)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Decisões Técnicas](#-decisões-técnicas)
- [Como Rodar](#-como-rodar)
- [Deploy](#-deploy)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Melhorias Futuras](#-melhorias-futuras)
- [Autor](#-autor)

---

## 🎯 Sobre o Projeto

O **Foco no Concurso** nasceu de uma necessidade real: candidatos a concursos públicos com rotinas corridas — como aspirantes a Guarda Municipal, Bombeiro ou Trabalho Embarcado — não conseguem acompanhar o que já estudaram.

O resultado? Revisam sempre as mesmas matérias e esquecem outras por semanas.

Essa aplicação resolve isso de forma simples, visual e inteligente.

---

## ❌ O Problema

```
Estudante acorda cedo → trabalha o dia todo → chega em casa cansado
→ abre o caderno → não lembra o que revisou ontem
→ estuda o que lembra → ignora o que esqueceu
→ chega na prova sem ter revisado metade do edital
```

**Resultado:** Reprovação por falta de organização, não por falta de esforço.

---

## ✅ A Solução

```
Abre o app → vê em vermelho o que está atrasado
→ revisa o que precisa → marca como revisado
→ IA sugere tópicos importantes → IA monta cronograma
→ Chega na prova preparado ✅
```

---

## ⚡ Funcionalidades

### 📚 Gestão de Matérias
| Funcionalidade | Descrição |
|---|---|
| ➕ Adicionar | Cadastra nova matéria com data de hoje |
| ✅ Revisar | Marca matéria como revisada no dia atual |
| 🗑️ Remover | Deleta matéria que não precisa mais |
| 🔍 Autocomplete | Sugere matérias ao digitar (30+ opções) |

### 🎨 Visual Inteligente
| Status | Cor | Critério |
|---|---|---|
| ✅ Em dia | 🟢 Verde | Revisado há 0–2 dias |
| ⚠️ Atenção | 🟡 Amarelo | Revisado há 3–5 dias |
| 🔴 Atrasada | 🔴 Vermelho | Revisado há 6+ dias |

### 🤖 Inteligência Artificial
- **Tópicos automáticos:** Ao selecionar uma matéria, a IA lista os 5 tópicos mais cobrados em concursos
- **Plano de estudos:** Informe suas horas disponíveis, dias e data da prova — a IA monta um cronograma completo e personalizado

---

## 🛠️ Tecnologias

```
Frontend          Backend (simulado)    IA
─────────────     ──────────────────    ──────────────────
React 18          JSON Server           Claude (Anthropic)
TypeScript 5      REST API completa     claude-sonnet-4
CSS puro          GET / POST            Plano de estudos
Hooks customizados PATCH / DELETE       Sugestão de tópicos
```

### Por que essas tecnologias?

**React + TypeScript** → Tipagem estática garante que não existe `any` no código. Erros são pegos em desenvolvimento, não em produção.

**JSON Server** → Simula uma API REST completa sem precisar de backend. Perfeito para MVPs e projetos de estudo.

**CSS puro com variáveis** → Sem dependência de frameworks externos. Fácil de entender, fácil de modificar.

**Claude AI** → API mais avançada disponível para geração de planos de estudo e sugestões de conteúdo.

---

## 🧠 Decisões Técnicas

### Hook Customizado `useMaterias`
```typescript
// Toda a lógica de negócio fica aqui
// O App.tsx fica limpo e legível
export function useMaterias() {
  // useState  → estado das matérias
  // useEffect → busca inicial
  // useMemo   → estatísticas calculadas
  // useCallback → funções estabilizadas
}
```

### Uso dos Hooks (Requisito do Projeto)
```
useState    → estado das matérias, loading, erros, modal
useEffect   → busca as matérias quando o app abre
useMemo     → calcula estatísticas sem re-renderizar
useCallback → estabiliza criarMateria, revisarMateria, deletarMateria
useRef      → mantém foco no input após adicionar matéria
```

### Lógica de Status de Revisão
```typescript
function getStatus(ultimaRevisao: string): StatusRevisao {
  const dias = getDiasDesdeRevisao(ultimaRevisao);
  if (dias <= 2) return "em-dia";    // 🟢 tranquilo
  if (dias <= 5) return "atencao";   // 🟡 cuidado
  return "atrasada";                  // 🔴 revisar já!
}
```

### Tipagem Estrita (zero `any`)
```typescript
// Todas as entidades são tipadas
export interface Materia {
  id: number;
  nome: string;
  ultimaRevisao: string; // ISO: "2026-04-01"
}

export type StatusRevisao = "em-dia" | "atencao" | "atrasada";
```

---

## 🚀 Como Rodar

### Pré-requisitos
- Node.js 18+
- npm
- Conta na [Anthropic](https://console.anthropic.com) (para funcionalidades de IA)

### Instalação rápida (1 comando)

```bash
# Baixe o setup.sh e execute:
bash setup.sh
```

O script faz tudo automaticamente:
1. Cria o projeto com CRA + TypeScript
2. Instala todas as dependências
3. Cria todos os arquivos e pastas
4. Inicia a API e o frontend juntos

### Instalação manual

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/foco-no-concurso.git
cd foco-no-concurso

# 2. Instale as dependências
npm install

# 3. Configure o ambiente
cp .env.example .env
# Edite o .env com sua chave da Anthropic

# 4. Rode tudo com 1 comando
npm run dev
```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# URL da API
REACT_APP_API_URL=http://localhost:3001

# Chave da API Anthropic (obtenha em console.anthropic.com)
REACT_APP_ANTHROPIC_KEY=sk-ant-...
```

> ⚠️ **Nunca suba o `.env` para o GitHub!** Ele já está no `.gitignore`.

### Scripts disponíveis

```bash
npm run dev    # 🚀 Roda API + Frontend juntos (recomendado)
npm start      # Só o frontend
npm run api    # Só a API (porta 3001)
npm run build  # Build de produção
```

---

## ☁️ Deploy

### Frontend → Vercel

```bash
# 1. Faça push para o GitHub
git add .
git commit -m "feat: foco no concurso"
git push origin main

# 2. Acesse vercel.com → New Project → importe o repositório
# 3. Adicione a variável de ambiente:
#    REACT_APP_ANTHROPIC_KEY = sua_chave
# 4. Deploy! ✅
```

### API → Render

```
1. Acesse render.com → New Web Service
2. Conecte o repositório do GitHub
3. Configure:
   Build Command: npm install
   Start Command: npx json-server --watch db.json --port 10000 --host 0.0.0.0
   Port: 10000
4. Deploy! ✅
```

### Conectar Frontend + API

No Vercel, adicione a variável:
```
REACT_APP_API_URL = https://seu-app.onrender.com
```

> ⚠️ O plano gratuito do Render "dorme" após 15 min de inatividade. Primeira requisição pode demorar ~30s.

---

## 📁 Estrutura do Projeto

```
foco-no-concurso/
│
├── 📄 db.json                    # Banco de dados do json-server
├── 📄 .env                       # Variáveis de ambiente (não sobe pro GitHub)
├── 📄 package.json               # Dependências e scripts
│
├── 📁 public/
│   └── index.html                # HTML base
│
└── 📁 src/
    ├── 📄 App.tsx                 # Componente raiz
    ├── 📄 App.css                 # Estilos globais
    ├── 📄 index.tsx               # Entry point
    │
    ├── 📁 types/
    │   └── index.ts               # Interfaces e tipos TypeScript
    │
    ├── 📁 services/
    │   └── api.ts                 # Todas as chamadas REST
    │
    ├── 📁 hooks/
    │   └── useMaterias.ts         # Hook customizado com lógica de negócio
    │
    └── 📁 components/
        ├── MateriaCard.tsx        # Card de cada matéria
        ├── MateriaForm.tsx        # Formulário + autocomplete + IA
        ├── EmptyState.tsx         # Tela quando lista está vazia
        └── PlanoEstudosModal.tsx  # Modal do plano com IA
```

---

## 🔮 Melhorias Futuras

- [ ] 🔔 Notificações push para matérias atrasadas
- [ ] 📊 Gráfico de progresso semanal
- [ ] 🔐 Autenticação de usuário
- [ ] 📱 PWA — instalar no celular
- [ ] 🔍 Filtro por status (todas / atrasadas / em dia)
- [ ] 📝 Anotações por matéria
- [ ] 🔢 Contador de revisões realizadas
- [ ] 🌙 Modo escuro

---

## 👤 Autor

<div align="center">

**Feito com 💙 por [Seu Nome]**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Conectar-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/seu-usuario)
[![GitHub](https://img.shields.io/badge/GitHub-Seguir-181717?style=for-the-badge&logo=github)](https://github.com/seu-usuario)

<br/>

*"A diferença entre aprovado e reprovado está na organização do estudo."*

</div>

---

<div align="center">

⭐ **Se esse projeto te ajudou, deixa uma estrela no repositório!** ⭐

</div>