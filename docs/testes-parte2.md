# Testes da Parte 2

Teste ponta a ponta do CineTrack full stack, a partir do zero (Windows 11, Node v24.15.0). Backend em `http://localhost:3000` e frontend em `http://localhost:5173`. As chamadas diretas à API foram feitas com `curl`.

1. Recriar o banco com o seed

- Caso: rodei `node seed.js` na pasta `backend/`.
- Resultado esperado: `data/filmes.json` é recriado com os 6 filmes iniciais.
- Resultado obtido: o terminal mostrou `6 filmes gravados` e o arquivo ficou com A Origem, Parasita, O Auto da Compadecida, Duna: Parte Dois, Interestelar e Cidade de Deus.
- Passou ou falhou: passou.
- Correção feita: nenhuma.

2. Subir o backend

- Caso: rodei `npm install`, `cp .env.example .env` e `npm start` na pasta `backend/`.
- Resultado esperado: a API sobe na porta do `.env` e libera o frontend (CORS).
- Resultado obtido: o terminal mostrou `API na porta 3000`. `GET /filmes` devolveu 200 com os 6 filmes, com `Content-Type: application/json` e o cabeçalho `Access-Control-Allow-Origin: *`.
- Passou ou falhou: passou.
- Correção feita: nenhuma.

3. POST com nota 7 e status inválido

- Caso: enviei `POST /filmes` com `{"titulo":"Teste","ano":2020,"nota":7,"status":"visto"}`.
- Resultado esperado: 400 com a lista dos dois erros, e nada é salvo.
- Resultado obtido: `400` `{"erros":["nota deve estar entre 1 e 5","status deve ser assistido, assistindo ou quero"]}`. O `filmes.json` não mudou.
- Passou ou falhou: falhou na primeira rodada e passou depois da correção.
- Correção feita: antes, o servidor só conferia título e ano, aceitava nota 7 e status inventado e respondia `{ "erro": "Dados obrigatórios" }`. Criei a função `validarFilme` no `server.js`, adaptada da Parte 1. Ela junta todos os problemas numa lista e é usada no POST e no PUT.

4. POST sem nenhum campo

- Caso: enviei `POST /filmes` com o corpo `{}`.
- Resultado esperado: 400 com todos os problemas de uma vez.
- Resultado obtido: `400` `{"erros":["titulo é obrigatório","ano deve ser um número entre 1888 e 2030","nota deve estar entre 1 e 5","status deve ser assistido, assistindo ou quero"]}`.
- Passou ou falhou: passou.
- Correção feita: nenhuma (já coberta pela correção do caso 3).

5. POST válido

- Caso: enviei `POST /filmes` com `{"titulo":"Central do Brasil","ano":1998,"genero":"Drama","nota":5,"status":"assistido"}`.
- Resultado esperado: 201 com o filme criado, já com id.
- Resultado obtido: `201` `{"id":7,"titulo":"Central do Brasil","ano":1998,"genero":"Drama","nota":5,"status":"assistido"}`, e o filme foi gravado no `filmes.json`.
- Passou ou falhou: passou.
- Correção feita: nenhuma.

6. PUT com a mesma validação do POST

- Caso: enviei `PUT /filmes/7` com `{"nota":0,"status":"xyz"}` e, depois, com o filme completo trocando a nota para 4 e o status para `quero`.
- Resultado esperado: o primeiro devolve 400 com os erros; o segundo devolve 200 com o filme atualizado, mantendo o id.
- Resultado obtido: o primeiro devolveu `400` `{"erros":["nota deve estar entre 1 e 5","status deve ser assistido, assistindo ou quero"]}`. O segundo devolveu `200` `{"id":7,"titulo":"Central do Brasil","ano":1998,"genero":"Drama","nota":4,"status":"quero"}`.
- Passou ou falhou: passou.
- Correção feita: nenhuma (já coberta pela correção do caso 3).

7. Id inexistente

- Caso: chamei `GET /filmes/99`, `PUT /filmes/99` e `DELETE /filmes/99`.
- Resultado esperado: 404 nos três.
- Resultado obtido: os três devolveram `404` `{"erro":"Filme não encontrado"}`.
- Passou ou falhou: passou.
- Correção feita: nenhuma.

8. JSON malformado e rota inexistente

- Caso: enviei `POST /filmes` com o corpo `{titulo` e chamei `GET /rota-inexistente`.
- Resultado esperado: 400 e 404, os dois em JSON.
- Resultado obtido: `400` `{"erros":["corpo da requisição não é um JSON válido"]}` e `404` `{"erro":"Rota não encontrada"}`, os dois com `Content-Type: application/json`.
- Passou ou falhou: falhou na primeira rodada e passou depois da correção.
- Correção feita: antes, o Express respondia os dois casos com uma página HTML, e a do JSON malformado ainda mostrava o stack trace. Coloquei no fim do `server.js` um tratador de rota inexistente (404) e um tratador de erros, os dois respondendo em JSON.

9. Filtro, busca e remoção pela API

- Caso: chamei `GET /filmes?status=quero&q=inter`, depois `DELETE /filmes/2` duas vezes seguidas.
- Resultado esperado: a listagem traz só Interestelar; a primeira remoção devolve 204 e a segunda, 404.
- Resultado obtido: a listagem devolveu `200` só com Interestelar. O primeiro DELETE devolveu `204` sem corpo, e o segundo devolveu `404`.
- Passou ou falhou: passou.
- Correção feita: nenhuma.

10. Subir o frontend

- Caso: em outro terminal, rodei `npm install` e `npm run dev` na pasta `frontend/`.
- Resultado esperado: a interface abre em `http://localhost:5173`.
- Resultado obtido: o Vite subiu e `http://localhost:5173` respondeu 200. O `npm run build` também gerou o `dist/` sem erros.
- Passou ou falhou: passou.
- Correção feita: nenhuma.

11. Carregar a lista ao abrir a página

- Caso: abri `http://localhost:5173` com o backend no ar e o banco recém-criado pelo seed.
- Resultado esperado: aparece "Carregando..." e, em seguida, os filmes vindos da API, com os contadores dos filtros certos.
- Resultado obtido: "Carregando..." apareceu por um instante e logo vieram os 6 cards, em ordem de título: A Origem, Cidade de Deus, Duna: Parte Dois, Interestelar, O Auto da Compadecida e Parasita. Os filtros mostraram "Todos (6)", "Assistido (3)", "Assistindo (1)" e "Quero assistir (2)", o rodapé mostrou "CineTrack © 2026 · 6 filmes cadastrados" e a aba ficou com o título "CineTrack (6)".
- Passou ou falhou: passou.
- Correção feita: nenhuma.

12. Adicionar um filme pela interface

- Caso: cliquei em "+ Adicionar" e cadastrei "Central do Brasil" (1998, Drama, Assistido, nota 5).
- Resultado esperado: o modal fecha, o card aparece sem recarregar a página e o filme é gravado no `filmes.json`.
- Resultado obtido: o modal abriu com o título "Adicionar filme". Ao salvar, o frontend fez um único `POST /filmes`, o modal fechou e a lista passou de 6 para 7 cards, com o novo card mostrando "1998 · Drama", "Nota: ★★★★★" e o selo "Assistido". Os contadores foram para "Todos (7)" e "Assistido (4)", e o `filmes.json` ganhou o filme com id 7.
- Passou ou falhou: passou.
- Correção feita: nenhuma.

13. Editar um filme pela interface

- Caso: cliquei em Editar no card "Central do Brasil" e troquei o status para "Quero assistir" e a nota para 4.
- Resultado esperado: o formulário abre preenchido e, ao salvar, só esse card muda, sem duplicar.
- Resultado obtido: o modal abriu com o título "Editar filme" e os campos preenchidos (Central do Brasil, 1998, Drama, Assistido, 5). Ao salvar, o frontend fez um `PUT /filmes/7`, a lista continuou com 7 cards e só esse card mudou, agora com "Nota: ★★★★☆" e o selo "Quero assistir". Os contadores foram para "Assistido (3)" e "Quero assistir (3)", e o `filmes.json` ficou com `"status": "quero"` e `"nota": 4`, mantendo o id 7.
- Passou ou falhou: passou.
- Correção feita: nenhuma.

14. Remover, cancelando e confirmando

- Caso: cliquei em Remover no card "Central do Brasil" e cancelei a confirmação. Depois repeti e confirmei.
- Resultado esperado: ao cancelar, o filme continua; ao confirmar, o card some e o filme sai do `filmes.json`.
- Resultado obtido: apareceu a confirmação "Remover este filme?". Ao cancelar, nenhuma requisição foi feita e a lista continuou com 7 cards. Ao confirmar, o frontend fez um `DELETE /filmes/7`, o card sumiu, a lista voltou a 6 cards com "Todos (6)", e o filme saiu do `filmes.json`.
- Passou ou falhou: passou.
- Correção feita: a versão React removia sem pedir confirmação, diferente da Parte 1. Coloquei o `confirm("Remover este filme?")` antes de chamar a API.

15. Validação do formulário

- Caso: tentei salvar com o formulário vazio. Depois preenchi título, gênero e nota, mas com o ano 3000.
- Resultado esperado: nada é enviado à API; o modal continua aberto e mostra os erros.
- Resultado obtido: com o formulário vazio, o modal continuou aberto e mostrou a caixa vermelha "Não foi possível salvar:" com "Título é obrigatório.", "Ano deve ser entre 1888 e 2030.", "Gênero é obrigatório." e "Nota deve ser entre 1 e 5.". Com o ano 3000, a caixa mostrou só "Ano deve ser entre 1888 e 2030.". Nos dois casos nenhuma requisição foi feita à API e o `filmes.json` continuou com 6 filmes. Depois, o Esc fechou o modal.
- Passou ou falhou: passou.
- Correção feita: a versão React não tinha a validação de formulário da Parte 1 e dependia só do servidor. Levei a `validarFilme` para `src/validacao.js`, e o modal passou a chamá-la antes de enviar. Se a API recusar mesmo assim, o `api.js` lê a lista `erros` da resposta e o modal mostra na mesma caixa, no lugar do antigo `alert("HTTP 400")`, que não dizia o que estava errado.

16. Busca, filtro e ordenação juntos

- Caso: ativei o filtro "Quero assistir", troquei a ordenação para "Ano" e busquei "cidade". Depois voltei para "Todos", limpei a busca e ordenei por "Nota".
- Resultado esperado: os três critérios se combinam; a ordem por nota vai da maior para a menor.
- Resultado obtido: o filtro "Quero assistir" deixou só Cidade de Deus e Interestelar, já em ordem de ano (2002, 2014). Com a busca "cidade", sobrou só Cidade de Deus, e o rodapé mostrou "CineTrack © 2026 · 6 filmes cadastrados · exibindo 1". Em "Todos" por nota, vieram primeiro as notas 5 (A Origem, O Auto da Compadecida, Interestelar) e depois as notas 4 (Parasita, Duna: Parte Dois, Cidade de Deus).
- Passou ou falhou: passou.
- Correção feita: a versão React não tinha a ordenação da Parte 1 nem os contadores nos filtros. Acrescentei o select "Ordenar por" e os contadores no componente `Filtros`, com os mesmos critérios da Parte 1.

17. Backend fora do ar

- Caso: parei o backend e recarreguei a página. Depois tentei adicionar um filme válido.
- Resultado esperado: aparece uma mensagem de erro visível e a interface não trava.
- Resultado obtido: no lugar da lista apareceu "Erro: Failed to fetch". Ao tentar salvar, o modal continuou aberto com a caixa "Não foi possível salvar: Failed to fetch". O botão Cancelar fechou o modal normalmente, ou seja, a interface não travou.
- Passou ou falhou: passou.
- Correção feita: nenhuma.

18. Reiniciar o servidor e conferir a persistência

- Caso: depois de adicionar, editar e remover pela API e pela interface, parei o backend e subi de novo com `npm start`.
- Resultado esperado: os dados continuam iguais aos de antes de parar.
- Resultado obtido: pela API, `GET /stats` devolvia `{"total":6,"porStatus":{"assistido":2,"assistindo":1,"quero":3},"mediaNotas":4.5}` antes de parar e devolveu exatamente o mesmo depois de subir de novo. `GET /filmes/7` voltou com a edição (nota 4, status quero), e `GET /filmes/2` continuou dando 404. Pela interface, recarreguei a página depois de reiniciar o servidor e a lista voltou com os mesmos 6 cards de antes de parar (A Origem, Cidade de Deus, Duna: Parte Dois, Interestelar, O Auto da Compadecida e Parasita), sem o filme removido no caso 14.
- Passou ou falhou: passou.
- Correção feita: nenhuma.

As correções feitas nesta rodada (casos 3, 8, 14, 15 e 16) estão no commit de validação e documentação do Marco 2.
