# Contribuindo para ALAGER Site

Obrigado por querer contribuir! Este documento fornece diretrizes para contribuição ao projeto.

## 🤝 Como Contribuir

### 1. Fork e Clone
```bash
git clone https://github.com/seu-usuario/alager-site.git
cd alager-site
```

### 2. Crie uma Branch
```bash
git checkout -b feature/sua-feature
# ou
git checkout -b fix/seu-fix
```

Use prefixos convencionais:
- `feature/` - Nova funcionalidade
- `fix/` - Correção de bug
- `docs/` - Documentação
- `refactor/` - Refatoração
- `chore/` - Tarefas (dependências, setup, etc)

### 3. Configure o Ambiente
Siga o [SETUP.md](./SETUP.md) para configurar o projeto localmente.

### 4. Faça suas Mudanças
- Siga o estilo de código do projeto
- Use TypeScript e tipos apropriados
- Escreva componentes seguindo atomic design
- Mantenha a organização de pastas

### 5. Testes e Lint
```bash
npm run lint
```

### 6. Commit com Mensagens Claras
Siga [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adiciona nova seção de blog
fix: corrige renderização de header em mobile
docs: atualiza README
refactor: simplifica lógica do componente Button
```

### 7. Push e Pull Request
```bash
git push origin feature/sua-feature
```

Abra um Pull Request com:
- Título claro e descritivo
- Descrição das mudanças
- Screenshots (se for UI)
- Reference de issues relacionadas (#123)

## 📋 Padrões de Código

### Componentes React
```typescript
// Use type props explícito
interface ButtonProps {
  variant?: 'primary' | 'outline' | 'gold';
  children: React.ReactNode;
  disabled?: boolean;
}

export function Button({ variant = 'primary', children, disabled }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} disabled={disabled}>
      {children}
    </button>
  );
}
```

### Organização de Componentes
```
components/
├── atoms/          # Componentes básicos (Button, Input, etc)
├── molecules/      # Componentes compostos (Card, Header, etc)
└── organisms/      # Seções complexas (Footer, Hero, etc)
```

### Estilos
- Use Tailwind CSS para styling
- Prefira utilitários ao invés de CSS customizado
- Organize classes com prettier-plugin-tailwindcss

### TypeScript
- Sempre use tipos explícitos
- Evite `any`
- Defina interfaces/types para dados do Sanity
- Use strict mode (já configurado)

## 🌐 Internacionalização

Quando adicionar conteúdo novo:

1. Adicione as traduções em `messages/{en,es,pt}.json`
2. Use `useTranslations()` hook no componente
3. Teste em todos os idiomas

```typescript
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('common');
  return <h1>{t('title')}</h1>;
}
```

## 🎯 Checklist antes de PR

- [ ] Código segue o estilo do projeto
- [ ] Sem `console.log` ou `debugger` em produção
- [ ] Testei a funcionalidade localmente
- [ ] Rodei `npm run lint` com sucesso
- [ ] Atualizei documentação se necessário
- [ ] Commit messages seguem padrão
- [ ] Sem dados sensíveis no código

## 🔐 Segurança

- **Nunca commite** `.env.local` ou tokens/credenciais
- Use `process.env` para variáveis sensíveis
- Valide inputs de usuário com Zod
- Revise tokens regularmente no Sanity

## 📚 Recursos

- [Next.js Best Practices](https://nextjs.org/docs/app)
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)
- [Tailwind CSS](https://tailwindcss.com)
- [Sanity Documentation](https://www.sanity.io/docs)

## ❓ Dúvidas?

- Abra uma [discussion](https://github.com/seu-usuario/alager-site/discussions)
- Veja as [issues abertas](https://github.com/seu-usuario/alager-site/issues)
- Contate o time ALAGER

---

**Obrigado por contribuir! 🙌**
