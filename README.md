# CineTrack

Aplicação web para a disciplina de Programação de Sistemas Web.

- Aluno: Miguel Silva Rampazzo
- R.A.: 140768

## O que é

O CineTrack é um catálogo pessoal de filmes. Nele você registra os filmes que já assistiu, que está assistindo ou que quer assistir, com ano, gênero, pôster, nota e comentário. A Parte 1 é feita só com HTML, CSS e JavaScript puro, sem frameworks.

## Como executar a Parte 1

1. Clone o repositório: `git clone https://github.com/MiguelRampazzo/CineTrack.git`
2. Abra a pasta no VS Code.
3. Abra `docs/parte1/index.html` com a extensão **Live Server** (botão direito → "Open with Live Server").

Também dá para abrir o `index.html` direto no navegador, porque a Parte 1 não usa módulos.

## O que funciona

- Lista de filmes em cards, com grade responsiva.
- Adicionar, editar e remover filmes (a remoção pede confirmação), pelo modal de formulário.
- Validação do formulário, com as mensagens de erro exibidas no modal.
- Filtro por status (Todos, Assistido, Assistindo, Quero assistir), com contadores.
- Busca por título, combinada com o filtro.
- Ordenação por título (respeitando acentos), ano ou nota, combinada com a busca e o filtro.
- Persistência no `localStorage` (chave `cinetrack:filmes`). Na primeira visita, carregam os 6 filmes iniciais.
- O modal fecha com Esc, com o botão Cancelar ou com um clique fora dele.
- Dark mode automático, conforme o tema do sistema.
- Estilo de impressão: o catálogo sai limpo, sem busca, filtros, botões ou rodapé.
- Página "Sobre" (`sobre.html`).

## Parte 2: React + API Node (Marco 2)

A partir do Marco 2, o CineTrack tem um frontend em React (`frontend/`) que consome uma API em Node + Express (`backend/`). Os filmes ficam gravados em `backend/data/filmes.json`.

### Como rodar o backend

Requer Node 20.6 ou superior (por causa do `--env-file`).

```bash
cd backend
npm install
cp .env.example .env   # define PORT=3000
npm run seed           # (opcional) recria data/filmes.json com os 6 filmes iniciais
npm run dev            # API em http://localhost:3000, com recarga automática
```

Use `npm start` para subir sem recarga.

Rotas:

| Método | Rota | O que faz |
|---|---|---|
| GET | `/filmes` | Lista os filmes (aceita `?status=assistido|assistindo|quero` e `?q=` para buscar no título) |
| GET | `/filmes/:id` | Retorna um filme (404 se não existir) |
| POST | `/filmes` | Cria um filme (201; 400 com a lista de erros) |
| PUT | `/filmes/:id` | Atualiza um filme, mantendo o id (200; 400 com a lista de erros; 404 se não existir) |
| DELETE | `/filmes/:id` | Remove um filme (204; 404 se não existir) |
| GET | `/stats` | Total de filmes, contagem por status e média das notas |

O POST e o PUT validam o filme: `titulo` obrigatório, `ano` entre 1888 e 2030, `nota` entre 1 e 5 e `status` igual a `assistido`, `assistindo` ou `quero`. Se algo estiver errado, a resposta é `400` com todos os problemas de uma vez: `{ "erros": ["nota deve estar entre 1 e 5", ...] }`.

A documentação completa da API (corpos, parâmetros e códigos de resposta) está em [docs/api.md](docs/api.md).

### Como rodar o frontend

Com o backend no ar, em outro terminal (a partir da raiz do repositório):

```bash
cd frontend
npm install
npm run dev     # http://localhost:5173
```

Para gerar o build de produção: `npm run build` (saída em `frontend/dist/`).

## Testes

- Parte 1: [docs/testes-parte1.md](docs/testes-parte1.md)
- Parte 2 (teste ponta a ponta, com persistência após reiniciar o servidor): [docs/testes-parte2.md](docs/testes-parte2.md)
