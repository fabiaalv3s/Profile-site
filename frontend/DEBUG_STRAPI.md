# Guia de Debug - Conexão Strapi

## Endpoints de Debug Disponíveis

### 1. `/api/test-strapi`
Testa diferentes variações de endpoints e mostra qual funciona.
- **Acesse:** `http://localhost:3001/api/test-strapi`
- **Mostra:** Todas as variações testadas, status de cada uma, e recomendações

### 2. `/api/debug-strapi`
Diagnóstico completo da conexão com Strapi.
- **Acesse:** `http://localhost:3001/api/debug-strapi`
- **Mostra:** 
  - Conectividade básica
  - Validação do token
  - Teste de todos os endpoints
  - Recomendações específicas

## Teste Manual no Navegador

### 1. Teste Básico de Conectividade
Abra no navegador:
```
http://localhost:1337/api
```
Deve retornar uma lista de endpoints disponíveis.

### 2. Teste com Token (usando extensão do navegador)

**Opção A: ModHeader (Chrome/Edge)**
1. Instale a extensão ModHeader
2. Adicione header:
   - Name: `Authorization`
   - Value: `Bearer d4976dbec16ff807201f60427d247965f87d0d780d673c1d63d3aef89f4d13b74563798a9d681c43e3ffe8a9b0f514f8124086919afe28481473de4c7c2732d47282b97a16b6a3f68dd4bec6c14ec917844fb293fea7378edd62e1915c0739642390b1e5dfe61b3582788a9e03a5c045b24a9f6b69e917abc79e45a9f6edf889`
3. Acesse: `http://localhost:1337/api/profile`

**Opção B: curl (PowerShell)**
```powershell
$headers = @{
    "Authorization" = "Bearer d4976dbec16ff807201f60427d247965f87d0d780d673c1d63d3aef89f4d13b74563798a9d681c43e3ffe8a9b0f514f8124086919afe28481473de4c7c2732d47282b97a16b6a3f68dd4bec6c14ec917844fb293fea7378edd62e1915c0739642390b1e5dfe61b3582788a9e03a5c045b24a9f6b69e917abc79e45a9f6edf889"
    "Content-Type" = "application/json"
}

Invoke-RestMethod -Uri "http://localhost:1337/api/profile" -Headers $headers -Method Get
```

### 3. Testar Todos os Endpoints
```powershell
$token = "d4976dbec16ff807201f60427d247965f87d0d780d673c1d63d3aef89f4d13b74563798a9d681c43e3ffe8a9b0f514f8124086919afe28481473de4c7c2732d47282b97a16b6a3f68dd4bec6c14ec917844fb293fea7378edd62e1915c0739642390b1e5dfe61b3582788a9e03a5c045b24a9f6b69e917abc79e45a9f6edf889"
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

$endpoints = @(
    "/api/profile",
    "/api/profiles",
    "/api/experiences",
    "/api/educations",
    "/api/skills",
    "/api/projects",
    "/api/certifications"
)

foreach ($endpoint in $endpoints) {
    Write-Host "Testing: $endpoint"
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:1337$endpoint" -Headers $headers -Method Get
        Write-Host "✅ SUCCESS" -ForegroundColor Green
        Write-Host ($response | ConvertTo-Json -Depth 2)
    } catch {
        Write-Host "❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
    }
    Write-Host "---"
}
```

## Checklist de Verificação

### No Strapi Admin
- [ ] Strapi está rodando em `http://localhost:1337`
- [ ] Você consegue acessar o admin panel
- [ ] Profile está publicado (status "Published", não "Draft")
- [ ] Outros content types estão publicados
- [ ] Permissões configuradas: Settings → Users & Permissions → Roles → Public
  - [ ] Profile: `find`, `findOne` ✅
  - [ ] Experience: `find`, `findOne` ✅
  - [ ] Education: `find`, `findOne` ✅
  - [ ] Skill: `find`, `findOne` ✅
  - [ ] Project: `find`, `findOne` ✅
  - [ ] Certification: `find`, `findOne` ✅

### No Frontend
- [ ] Arquivo `.env.local` existe em `frontend/`
- [ ] `.env.local` contém:
  ```
  NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
  NEXT_PUBLIC_STRAPI_API_TOKEN=d4976dbec16ff807201f60427d247965f87d0d780d673c1d63d3aef89f4d13b74563798a9d681c43e3ffe8a9b0f514f8124086919afe28481473de4c7c2732d47282b97a16b6a3f68dd4bec6c14ec917844fb293fea7378edd62e1915c0739642390b1e5dfe61b3582788a9e03a5c045b24a9f6b69e917abc79e45a9f6edf889
  ```
- [ ] Servidor Next.js foi reiniciado após criar `.env.local`

### Rebuild do Strapi
- [ ] Executeu `npm run build` no diretório do Strapi
- [ ] Reiniciou o Strapi após o build

## Logs do Console

Quando rodar o frontend, verifique o console do terminal. Os logs do StrapiClient mostrarão:
- URL completa sendo acessada
- Headers sendo enviados (token mascarado)
- Status da resposta
- Erros detalhados

## Próximos Passos se Ainda Não Funcionar

1. **Verificar logs do Strapi**: O terminal onde o Strapi está rodando mostra as requisições recebidas?
2. **Testar token no Postman/Insomnia**: Use uma ferramenta de API para testar diretamente
3. **Verificar versão do Strapi**: Confirme se é realmente Strapi 5.x
4. **Verificar se API está habilitada**: No Strapi, verifique se a API REST está ativa
