Requisitos

Campos :

1. Título: Texto simples, obrigatório. Nome da obra.
2. Ano: Número inteiro (entre 1888 e o ano corrente), obrigatório. Ano de lançamento.
3. Gênero: Texto simples, obrigatório. Categoria ou gênero cinematográfico.
4. URL do Pôster: Texto (formato URL), opcional. Link da imagem de capa.
5. Status: Valor enumerado/seleção, obrigatório. Opções permitidas: assistido, assistindo, quero assistir.
6. Nota: Número inteiro de 1 a 5 (ou avaliação por estrelas), opcional.
7. Comentário: Texto longo (textarea), opcional. Impressões e resenha pessoal.

---

Áreas da Interface

A interface do CineTrack é dividida nas seguintes funções:

Cabeçalho: 
  - Identidade da aplicação (título CineTrack).
  - Campo de busca em tempo real (input[type="search"]).
  - Botão de ação rápida para adicionar filme (+ Adicionar).

Barra de Filtros:
  - Botões em formato de pílula para filtrar filmes por estado (Todos, Assistido, Assistindo, Quero assistir).

Área Principal:
  - Grade responsiva de exibição dos filmes cadastrados.
  - Cada card apresenta o pôster (na proporção 2:3), título, ano, gênero, nota, badge de status e botões de ação (Editar e Remover).

Formulário de Cadastro:
  - Caixa de diálogo sobreposta contendo os campos de entrada para cadastrar ou editar um filme, acompanhada dos botões Salvar e Cancelar.

Rodapé:
  - Informações institucionais e links secundários de navegação.

---

Tabela Ação × Método × Rota (API REST)

Mapeamento das operações do ciclo de vida dos recursos conforme o padrão RESTful:

| Ação          | Método HTTP | Rota (Endpoint) | Descrição |
| Listar filmes | GET | /filmes | Retorna a lista completa de filmes cadastrados em formato JSON.

| Buscar filme  | GET | /filmes/:id | Retorna os detalhes de um filme específico a partir do seu identificador.

| Cadastrar filme | POST | /filmes | Cria um novo registro de filme com base nos dados enviados no corpo da requisição.

| Atualizar filme | PUT | /filmes/:id | Atualiza todos os dados de um filme existente identificado por :id.

| Remover filme | DELETE | /filmes/:id | Exclui permanentemente o filme correspondente ao identificador fornecido.