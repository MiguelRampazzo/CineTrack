# API do CineTrack

API REST em Node + Express (`backend/server.js`). Os filmes ficam gravados em `backend/data/filmes.json`.

- URL base: `http://localhost:3000` (a porta vem de `PORT` no `.env`)
- Todas as respostas com corpo são JSON. Envie `Content-Type: application/json` no POST e no PUT.
- CORS liberado para qualquer origem (o frontend roda em `http://localhost:5173`).

## Modelo de filme

| Campo | Tipo | Obrigatório | Regra |
|---|---|---|---|
| `id` | número | gerado pelo servidor | Maior id existente + 1. Nunca muda. |
| `titulo` | texto | sim | Não pode ser vazio nem só espaços. |
| `ano` | número inteiro | sim | Entre 1888 e 2030. |
| `nota` | número inteiro | sim | Entre 1 e 5. |
| `status` | texto | sim | `assistido`, `assistindo` ou `quero`. |
| `genero` | texto | não | Livre. |
| `comentario` | texto | não | Livre. |
| `poster` | texto | não | Caminho ou URL da imagem. |

## Formato dos erros

- **400 (validação):** a lista com **todos** os problemas encontrados, de uma vez:

  ```json
  { "erros": ["nota deve estar entre 1 e 5", "status deve ser assistido, assistindo ou quero"] }
  ```

  Mensagens possíveis:
  - `titulo é obrigatório`
  - `ano deve ser um número entre 1888 e 2030`
  - `nota deve estar entre 1 e 5`
  - `status deve ser assistido, assistindo ou quero`

- **404:** `{ "erro": "Filme não encontrado" }`

- **400 (JSON malformado):** se o corpo não for um JSON válido, a resposta é `{ "erros": ["corpo da requisição não é um JSON válido"] }`.

- **404 (rota inexistente):** qualquer rota que não esteja nesta documentação devolve `{ "erro": "Rota não encontrada" }`.

- **500:** erro inesperado no servidor devolve `{ "erro": "Erro interno do servidor" }`. O detalhe só aparece no terminal do backend.

Todas as respostas com corpo, inclusive as de erro, saem com `Content-Type: application/json`.

## Rotas

### GET /filmes — listar filmes

| Item | Valor |
|---|---|
| Método | `GET` |
| Caminho | `/filmes` |
| Parâmetros | Query opcionais: `status` (`assistido`, `assistindo` ou `quero`) filtra pelo status; `q` busca por trecho do título, sem diferenciar maiúsculas. Os dois podem ser combinados. |
| Corpo | Nenhum |
| Respostas | `200` com a lista de filmes (lista vazia se nada combinar) |

Exemplo: `GET /filmes?status=quero&q=inter` → `200` com `[{ "id": 5, "titulo": "Interestelar", ... }]`

### GET /filmes/:id — buscar um filme

| Item | Valor |
|---|---|
| Método | `GET` |
| Caminho | `/filmes/:id` |
| Parâmetros | `id` (número) no caminho |
| Corpo | Nenhum |
| Respostas | `200` com o filme; `404` se o id não existir |

### POST /filmes — criar filme

| Item | Valor |
|---|---|
| Método | `POST` |
| Caminho | `/filmes` |
| Parâmetros | Nenhum |
| Corpo | Filme sem `id`: `titulo`, `ano`, `nota` e `status` obrigatórios; `genero`, `comentario` e `poster` opcionais |
| Respostas | `201` com o filme criado (já com `id`); `400` com `{ "erros": [...] }` se algum campo for inválido |

Exemplo de corpo válido:

```json
{ "titulo": "Central do Brasil", "ano": 1998, "genero": "Drama", "nota": 5, "status": "assistido" }
```

### PUT /filmes/:id — atualizar filme

| Item | Valor |
|---|---|
| Método | `PUT` |
| Caminho | `/filmes/:id` |
| Parâmetros | `id` (número) no caminho |
| Corpo | Campos a alterar. Eles são mesclados ao filme atual e o resultado passa pela **mesma validação do POST**. Um `id` no corpo é ignorado. |
| Respostas | `200` com o filme atualizado; `400` com `{ "erros": [...] }` se o resultado for inválido; `404` se o id não existir |

### DELETE /filmes/:id — remover filme

| Item | Valor |
|---|---|
| Método | `DELETE` |
| Caminho | `/filmes/:id` |
| Parâmetros | `id` (número) no caminho |
| Corpo | Nenhum |
| Respostas | `204` sem corpo; `404` se o id não existir |

### GET /stats — estatísticas

| Item | Valor |
|---|---|
| Método | `GET` |
| Caminho | `/stats` |
| Parâmetros | Nenhum |
| Corpo | Nenhum |
| Respostas | `200` com `{ "total": número, "porStatus": { "assistido": n, ... }, "mediaNotas": número }`. A média tem uma casa decimal e ignora filmes sem nota; é `0` se não houver filmes. |

## Resumo dos códigos

| Código | Quando |
|---|---|
| `200` | Leitura (GET) ou atualização (PUT) bem-sucedida |
| `201` | Filme criado (POST) |
| `204` | Filme removido (DELETE), sem corpo |
| `400` | Dados inválidos no POST ou no PUT, ou JSON malformado |
| `404` | Filme com o `id` informado não existe (GET, PUT, DELETE em `/filmes/:id`), ou rota inexistente |
| `500` | Erro inesperado no servidor |
