# Guia Rápido de Instalação

## Passo a Passo Completo

### 1. Instalar Dependências

#### Frontend
```bash
cd frontend
npm install
```

#### CMS
```bash
cd cms
npm install
```

### 2. Configurar Variáveis de Ambiente

#### Frontend
```bash
cd frontend
cp .env.example .env
```

Edite o `.env`:
```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### CMS
O `.env` será gerado automaticamente na primeira execução do Strapi.

### 3. Iniciar o Strapi

```bash
cd cms
npm run develop
```

**Primeira vez:**
1. Acesse `http://localhost:1337/admin`
2. Crie uma conta de administrador
3. Configure as permissões:
   - Settings > Users & Permissions Plugin > Roles > Public
   - Marque `find` e `findOne` para: Profile, Experience, Education, Skill, Project, Certification
   - Marque `create` para: ContactMessage

### 4. Popular o Strapi com Dados

1. Acesse o admin panel: `http://localhost:1337/admin`
2. Navegue até cada content type
3. Use os dados em `cms/src/data/seed/seed-data.ts` como referência
4. Crie os registros manualmente:
   - **Profile** (single type): 1 registro
   - **Experience**: 3 registros
   - **Education**: 1 registro
   - **Skill**: ~20 registros
   - **Certification**: 2 registros
   - **Project**: Deixar vazio (você preencherá depois)
5. Publique todos os registros após criar

### 5. Iniciar o Frontend

```bash
cd frontend
npm run dev
```

Acesse `http://localhost:3000`

## Estrutura de URLs

- Frontend: `http://localhost:3000`
- Strapi Admin: `http://localhost:1337/admin`
- Strapi API: `http://localhost:1337/api`

## Troubleshooting

### Erro de conexão com Strapi
- Verifique se o Strapi está rodando na porta 1337
- Verifique a variável `NEXT_PUBLIC_STRAPI_URL` no `.env` do frontend

### Erro 403 ao acessar API
- Configure as permissões no Strapi (passo 3)
- Certifique-se de que os registros estão publicados

### Erro de build
- Execute `npm run type-check` para verificar erros TypeScript
- Execute `npm run lint` para verificar erros de lint

## Próximos Passos

1. Adicione sua foto no Profile
2. Faça upload do seu CV em PDF no Profile
3. Adicione projetos no content type Project
4. Personalize as cores e estilos no Tailwind config
5. Configure o deploy no Vercel (frontend)
