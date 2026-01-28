# Frontend - Portfolio

Aplicação Next.js para o site de portfólio profissional.

## Tecnologias

- Next.js 14+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS
- shadcn/ui
- next-intl (i18n)
- Zod

## Instalação

```bash
npm install
```

## Configuração

Copie `.env.example` para `.env` e configure:

```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:3000`

## Build

```bash
npm run build
npm run start
```

## Estrutura

```
src/
├── domain/              # Entidades, interfaces, tipos
├── application/         # Services, use cases
├── infrastructure/      # Repositórios, mappers, validators
└── presentation/        # Componentes, páginas, hooks
```

## Scripts

- `dev` - Desenvolvimento
- `build` - Build produção
- `start` - Servidor produção
- `lint` - ESLint
- `format` - Prettier
- `type-check` - Verificação TypeScript
