# Desafio MB Web

Aplicação de cadastro de usuários em múltiplos passos, construída com **Vue 3**, **Vue Router** e **Node.js/Express**.

O formulário é dividido em 4 etapas sequenciais (e-mail, dados cadastrais, senha e revisão), com suporte a dois tipos de cadastro — Pessoa Física (PF) e Pessoa Jurídica (PJ) — e navegação por rotas reais no cliente.

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework frontend | Vue 3 (Composition API + `<script setup>`) |
| Roteamento | Vue Router 4 |
| Build | Vite 5 |
| Backend | Node.js + Express 4 |
| HTTP client | `fetch` nativo |
| Estilização | CSS puro com custom properties |

---

## Pré-requisitos

- Node.js >= 18
- npm >= 9

---

## Instalação

```bash
npm install
```

---

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Sobe cliente (porta 3000) e servidor (porta 3001) simultaneamente |
| `npm run client` | Apenas o cliente Vite |
| `npm run server` | Apenas o servidor Express |
| `npm run build` | Gera o bundle de produção em `dist/` |
| `npm run preview` | Serve o build de produção localmente |

---

## Executando localmente

```bash
npm run dev
```

- **Cliente:** http://localhost:3000
- **API:** http://localhost:3001

---

## Rotas do cliente

| Rota | Descrição |
|---|---|
| `/` | Redireciona para `/registration/email` |
| `/registration/email` | Passo 1 — e-mail e tipo de cadastro |
| `/registration/person` | Passo 2 — dados cadastrais (PF ou PJ) |
| `/registration/password` | Passo 3 — senha de acesso |
| `/registration/review` | Passo 4 — revisão e envio |
| `/registration/success` | Confirmação de cadastro realizado |

---

## API

### `GET /registration`
Retorna confirmação de que o endpoint está ativo.

### `POST /registration`
Recebe os dados do formulário em JSON e valida os campos obrigatórios.

---

## Estrutura do projeto

```
├── server/
│   ├── index.js
│   └── routes/
│
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── routes/        # Configuração do Vue Router
│   ├── styles/        # Tokens de design e estilos globais
│   ├── shared/        # Funções utilitárias de formatação
│   ├── validators/    # Funções de validação de campos
│   ├── services/      # Camada de comunicação HTTP
│   ├── components/    # Componentes reutilizáveis de UI
│   └── views/
│       └── registration/   # Feature de cadastro (layout, steps e sucesso)
│
├── .gitignore
├── index.html
├── vite.config.js
└── package.json
```

---

## Convenções de nomenclatura

| Item | Padrão | Exemplo |
|---|---|---|
| Variáveis | camelCase | `formData`, `isSubmitting` |
| Funções | camelCase | `onSubmit()`, `validateForm()` |
| Componentes (instância) | PascalCase | `<StepEmail />`, `<BaseButton />` |
| Arquivos de componentes | PascalCase | `StepEmail.vue`, `UserRegistration.vue` |
| Utilitários e services | kebab-case | `format-cpf.js`, `http.js` |
| Constantes globais | SCREAMING_SNAKE_CASE | `ROUTE_TO_STEP`, `ACCOUNT_TYPE_OPTIONS` |
| Pastas | kebab-case | `step-personal-data/`, `base-button/` |

---

## Arquitetura do fluxo de cadastro

O estado do formulário (`formData`) é mantido em `UserRegistration.vue`, componente pai de todas as rotas filhas de `/registration`. Os dados são passados para cada step via prop e retornam ao pai via `emit('update', data)` a cada avanço de etapa.

```
App.vue (RouterView)
└── UserRegistration.vue  ← formData, isSubmitting, onUpdate, onSubmit
    ├── StepEmail.vue          /registration/email
    ├── StepPersonalData.vue   /registration/person
    ├── StepPassword.vue       /registration/password
    ├── StepReview.vue         /registration/review
    └── RegistrationSuccess.vue /registration/success
```
