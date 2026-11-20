# CineTrack - Parte 1

Aplicação web para a disciplina de Programação de Sistemas Web.

- Aluno: Miguel Silva Rampazzo
- R.A.: 140768

## O que é

O CineTrack é um catálogo pessoal de filmes. Nele você registra os filmes que já assistiu, que está assistindo ou que quer assistir, com ano, gênero, pôster, nota e comentário. A Parte 1 é feita só com HTML, CSS e JavaScript puro, sem frameworks.

## Como executar

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

## Testes

O roteiro de testes da Parte 1 está em [docs/testes-parte1.md](docs/testes-parte1.md).
