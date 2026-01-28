# Troubleshooting - Conexão com Strapi

## Problema: Endpoint retorna 404

Se você está recebendo erro 404 ao acessar dados do Strapi, siga estes passos:

### 1. Fazer Rebuild do Strapi

Após criar ou modificar content types no Strapi, é necessário fazer rebuild:

```powershell
cd cms\Profile
# Pare o servidor (Ctrl+C)
npm run build
npm run develop
```

### 2. Testar Endpoint

Acesse o endpoint de teste no navegador:
```
http://localhost:3001/api/test-strapi
```

Este endpoint testa diferentes variações do endpoint Profile e mostra qual funciona.

### 3. Verificar Token

Certifique-se de que o arquivo `.env.local` existe e contém:
```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=seu-token-aqui
```

### 4. Verificar Permissões no Strapi

1. Acesse `http://localhost:1337/admin`
2. Vá em **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
3. Marque as permissões necessárias para cada content type:
   - **Profile**: `find`, `findOne`
   - **Experience**: `find`, `findOne`
   - **Education**: `find`, `findOne`
   - **Skill**: `find`, `findOne`
   - **Project**: `find`, `findOne`
   - **Certification**: `find`, `findOne`
   - **ContactMessage**: `create`

### 5. Verificar se Content Types Estão Publicados

No Content Manager do Strapi, certifique-se de que todos os registros estão com status **"Published"** (não "Draft").

## Endpoint de Teste

O endpoint `/api/test-strapi` testa automaticamente:
- `/api/profile` (sem populate)
- `/api/profile?populate=*`
- `/api/profile?populate[photo]=*&populate[cvPdf]=*`
- `/api/profile?populate=photo,cvPdf`

Use os resultados para identificar qual formato funciona no seu Strapi.
