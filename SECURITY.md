# 🔐 Segurança e Rotação de Credenciais

## Resumo de Credenciais do Projeto

Este documento serve como referência para rotação segura de credenciais e práticas de segurança do projeto ALAGER Site.

## 📋 Credenciais Gerenciadas

### Sanity CMS
- **Project ID**: `pgk66klx`
- **Dataset**: `production`
- **API Version**: `2026-06-25`
- **Token**: Armazenado em `.env.local` (NÃO COMMITADO)

### n8n Webhook
- **URL**: Webhook para formulário de associação
- **Status**: Ativo

## 🔄 Histórico de Rotação de Credenciais

| Data | Serviço | Ação | Responsável |
|------|---------|------|-------------|
| 2026-09-14 | Sanity | Gerado novo token (revogação do antigo) | André |

### Token Antigo (Revogado em 2026-09-14)
- ❌ **NÃO EXPOSTO NO GIT** (verificado em be978d2)
- ✅ Revogado no Sanity
- ✅ Substituído por novo token

## 🛡️ Boas Práticas de Segurança

### 1. Variáveis de Ambiente
- ✅ `.env.local` está no `.gitignore`
- ✅ `.env.example` é commitado (sem valores sensíveis)
- ⚠️ Nunca edite ou commite `.env.local`

### 2. Tokens e Credenciais
- 🔄 **Rotação Regular**: Revogue tokens antigos mensalmente
- 🔑 **Permissões Mínimas**: Use tokens com escopo limitado
- 📝 **Documentação**: Mantenha registro de rotações
- 🚨 **Urgente**: Se um token for exposto, revogue imediatamente

### 3. Commits e Histórico
```bash
# ✅ SEGURO: Arquivos ignorados
git add .
git commit -m "feat: nova funcionalidade"

# ❌ NUNCA: Commitar credenciais
git add .env.local  # Evite!
echo $SANITY_API_TOKEN  # Nunca exiba

# 🔍 VERIFICAR: Se credencial foi exposta
git log -p --all | grep "sk[A-Za-z0-9]"
```

### 4. Sanity Studio
- 📍 Localizado em `/studio`
- 🔐 Protegido por autenticação Sanity
- 🌐 Acesso requer SANITY_API_TOKEN válido

### 5. Webhooks (n8n)
- 🔗 URL pública (por design)
- ✅ Valide origem das requisições
- 🛡️ Implemente rate limiting
- 📝 Registre todas as chamadas

## 🚨 Procedimento de Resposta a Incidente

### Se um Token for Exposto:

1. **Imediato (< 5 min)**
   ```bash
   # Revogue no Sanity Dashboard
   https://sanity.io/manage
   ```

2. **Curto Prazo (< 1 hora)**
   - [ ] Gerar novo token
   - [ ] Atualizar `.env.local` localmente
   - [ ] Notificar time
   - [ ] Criar issue de segurança

3. **Médio Prazo (< 1 dia)**
   - [ ] Revisar histórico git (comando abaixo)
   - [ ] Verificar se houve acesso não autorizado
   - [ ] Limpar logs de API se necessário
   - [ ] Fazer push dos novos commits

### Verificar Exposição no Histórico Git

```bash
# Procurar por pattern de token
git log -p --all | grep -E "sk[A-Za-z0-9]{20,}"

# Procurar por nome da variável
git log -p --all | grep "SANITY_API_TOKEN"

# Se encontrado, usar git-filter-repo (rebase alternativo)
# ⚠️ Isso reescreve histórico - coordene com o time!
```

## 📚 Recursos de Segurança

### Documentação Interna
- [SETUP.md](./SETUP.md) - Configuração de ambiente
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Guia de contribuição
- [.env.example](./.env.example) - Template de variáveis

### Documentação Externa
- [Sanity Security](https://www.sanity.io/docs/security)
- [OWASP - API Security](https://owasp.org/www-project-api-security/)
- [GitHub - Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)

## ✅ Checklist de Segurança

### Para Desenvolvedor Novo

- [ ] Copia `.env.example` para `.env.local`
- [ ] Preenche credenciais (obtidas do admin)
- [ ] Verifica que `.env.local` está no `.gitignore`
- [ ] Roda `npm install` sem erros
- [ ] Testa conexão com Sanity: `npm run dev`
- [ ] Não commita `.env.local`

### Para Admin/Mantedor

- [ ] Revisa credenciais expostas regularmente
- [ ] Rotaciona tokens a cada 3 meses
- [ ] Monitora acessos ao Sanity Studio
- [ ] Mantém changelog de rotações (seção acima)
- [ ] Revoga acesso de ex-desenvolvedores

## 🔑 Como Obter Credenciais

1. **Sanity Project ID e Dataset**
   - Acesse: https://sanity.io/manage
   - Copie do seu projeto

2. **Sanity API Token**
   - Ir para: Project → API → Tokens
   - Cria novo token com permissões appropriadas
   - **Nunca compartilhe em chat ou email** 🔐

3. **n8n Webhook URL**
   - Obtém do admin ALAGER
   - URL é semi-pública (requer autenticação n8n)

## 📞 Contato e Reporte

Para questões de segurança:
- **Email**: [security@alager.org]
- **GitHub**: Abra issue privada
- **Urgente**: Contate admin diretamente

---

**Última atualização**: 2026-09-14  
**Próxima rotação recomendada**: 2026-12-14

**Lembrete**: A segurança é responsabilidade de todos! 🛡️
