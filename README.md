# Site Portfólio Profissional

Site de portfólio/profile profissional completo com Next.js e Strapi, seguindo Clean Architecture e SOLID.

## Estrutura do Projeto

O projeto está dividido em dois repositórios separados:

- **`frontend/`** - Aplicação Next.js (App Router) com TypeScript, Tailwind CSS e shadcn/ui
- **`cms/`** - Strapi 5.x como Headless CMS

## Tecnologias

### Frontend
- Next.js 14+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS
- shadcn/ui
- next-intl (i18n - Português/Inglês)
- Zod (validação)

### CMS
- Strapi 5.x
- TypeScript
- SQLite (desenvolvimento)

## Arquitetura

O frontend segue Clean Architecture com separação de camadas:

- **Domain**: Entidades, interfaces de repositórios, tipos
- **Application**: Services, use cases
- **Infrastructure**: Clientes HTTP, repositórios Strapi, mappers, validators
- **Presentation**: Componentes React, páginas, hooks

## Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Windows (configurado para Windows)

## Instalação

### 1. Frontend

```bash
cd frontend
npm install
cp .env.example .env
```

Edite o `.env` e configure:
```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. CMS (Strapi)

```bash
cd cms
npm install
cp .env.example .env
```

O `.env` será gerado automaticamente na primeira execução do Strapi.

## Como Rodar

### 1. Iniciar o Strapi

```bash
cd cms
npm run develop
```

Na primeira execução:
1. Acesse `http://localhost:1337/admin`
2. Crie uma conta de administrador
3. Configure as permissões da API (Settings > Users & Permissions Plugin > Roles > Public)
   - Marque todas as opções de `find` e `findOne` para Profile, Experience, Education, Skill, Project, Certification
   - Marque `create` para ContactMessage

### 2. Popular o Strapi com dados

Consulte `cms/src/data/seed/README.md` para instruções detalhadas.

Resumo:
1. Acesse o admin panel do Strapi
2. Navegue até cada content type
3. Crie os registros manualmente usando os dados em `cms/src/data/seed/seed-data.ts`
4. Publique todos os registros

### 3. Iniciar o Frontend

```bash
cd frontend
npm run dev
```

Acesse `http://localhost:3000`

## Scripts Disponíveis

### Frontend

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa ESLint
- `npm run format` - Formata código com Prettier
- `npm run type-check` - Verifica tipos TypeScript

### CMS

- `npm run develop` - Inicia Strapi em modo desenvolvimento
- `npm run start` - Inicia Strapi em modo produção
- `npm run build` - Build do Strapi

## Estrutura de Pastas

### Frontend

```
frontend/
├── src/
│   ├── domain/              # Camada de domínio
│   ├── application/         # Camada de aplicação
│   ├── infrastructure/      # Camada de infraestrutura
│   └── presentation/        # Camada de apresentação
├── messages/               # Traduções i18n
└── public/                 # Arquivos estáticos
```

### CMS

```
cms/
├── src/
│   ├── api/                # Content types
│   ├── config/             # Configurações
│   └── data/               # Scripts de seed
```

## Content Types do Strapi

- **Profile** (single type): Informações pessoais
- **Experience** (collection): Experiências profissionais
- **Education** (collection): Formação acadêmica
- **Skill** (collection): Habilidades técnicas
- **Project** (collection): Projetos desenvolvidos
- **Certification** (collection): Certificações
- **ContactMessage** (collection): Mensagens do formulário de contato

## Deploy

### Frontend (Vercel)

1. Conecte o repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático

### CMS

Por enquanto, o CMS deve rodar localmente. Para produção, considere:
- Railway
- Render
- Heroku
- VPS próprio

## Internacionalização

O site suporta Português (pt) e Inglês (en). As rotas são:
- `/pt` - Português (padrão)
- `/en` - Inglês

## Contribuindo

1. Siga os padrões de código estabelecidos
2. Use TypeScript com tipagem forte
3. Siga os princípios SOLID e Clean Architecture
4. Adicione testes para novas funcionalidades

## Licença

Este projeto é privado e de uso pessoal.
