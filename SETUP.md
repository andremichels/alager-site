# Guia de Setup - ALAGER Site

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 18+ e npm/yarn
- Conta Sanity.io com projeto criado
- Acesso ao webhook n8n (para formulários)

### 1. Instalação de Dependências

```bash
npm install
# ou
yarn install
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Preencha as seguintes variáveis:

#### Sanity CMS
- **NEXT_PUBLIC_SANITY_PROJECT_ID**: Seu Project ID do Sanity
- **NEXT_PUBLIC_SANITY_DATASET**: Nome do dataset (geralmente `production`)
- **NEXT_PUBLIC_SANITY_API_VERSION**: Versão da API (padrão: `2026-06-25`)
- **SANITY_API_TOKEN**: Token de API do Sanity com permissões de leitura/escrita

#### n8n Webhook
- **N8N_WEBHOOK_URL**: URL do webhook para formulário de associação

#### Vercel (Opcional)
- **VERCEL_URL**: URL do Vercel (preenchida automaticamente em deployment)

### 3. Executar em Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### 4. Build para Produção

```bash
npm run build
npm start
```

## 🔑 Obter Credenciais do Sanity

1. Acesse [sanity.io/manage](https://sanity.io/manage)
2. Selecione seu projeto
3. Vá para **API** → **Tokens**
4. Crie um novo token com permissões apropriadas
5. Copie o token para `.env.local`

## 🔐 Segurança

⚠️ **NUNCA commite `.env.local` no repositório!**

- `.env.local` está no `.gitignore`
- Use apenas `.env.example` para documentar variáveis necessárias
- Revogue tokens antigos regularmente
- Use tokens com permissões mínimas necessárias

## 📁 Estrutura do Projeto

```
src/
├── app/                 # App Router do Next.js
├── components/          # Componentes React (atoms, molecules, organisms)
├── data/               # Dados estáticos
├── i18n/               # Configuração de internacionalização
└── lib/                # Funções utilitárias e clientes
```

## 🌐 Idiomas Suportados

- 🇧🇷 Português (padrão)
- 🇪🇸 Espanhol
- 🇺🇸 Inglês

As URLs têm prefixo de idioma: `/pt/`, `/es/`, `/en/`

## 📚 Documentação

- [Next.js Docs](https://nextjs.org/docs)
- [Sanity Docs](https://www.sanity.io/docs)
- [next-intl Docs](https://next-intl-docs.vercel.app/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🐛 Troubleshooting

### Erro: "Cannot find Sanity project"
- Verifique se `NEXT_PUBLIC_SANITY_PROJECT_ID` está preenchido em `.env.local`
- Confirme se o dataset existe no Sanity

### Erro: "Unauthorized" ao acessar Sanity Studio
- Verifique se `SANITY_API_TOKEN` tem permissões corretas
- Gere um novo token se o antigo foi revogado

### Formulário não envia
- Verifique se `N8N_WEBHOOK_URL` está correto e acessível

## 💡 Dicas

- Use `npm run lint` para verificar código
- Componentes devem seguir a estrutura atoms/molecules/organisms
- Use TypeScript para maior type-safety
- Commit messages seguem Conventional Commits

---

**Dúvidas?** Abra uma issue no repositório!
