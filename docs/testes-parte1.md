# Testes da Parte 1

1. Adicionar um filme válido

- Caso: adicionei "Central do Brasil" (1998, Drama, Assistido, nota 5).
- Resultado esperado: o card aparece sem recarregar a página.
- Resultado obtido: o modal fechou e a lista passou de 6 para 7 cards, já com o novo card, sem recarregar a página.
- Passou ou falhou: passou.
- Correção feita: nenhuma.

2. Enviar ano fora da faixa

- Caso: tentei salvar um filme com o ano 3000.
- Resultado esperado: o erro aparece na interface e nada é salvo.
- Resultado obtido: o navegador bloqueou o envio com a validação nativa do campo (`min="1888" max="2030"`) e mostrou o aviso no próprio campo. O filme não foi salvo e o `localStorage` não mudou. Sem a validação nativa, a validação do JS mostra "Ano deve ser entre 1888 e 2030." na caixa de erro do modal e também não salva.
- Passou ou falhou: passou.
- Correção feita: nenhuma.

3. Editar um filme

- Caso: editei o título de "Parasita" para "Parasita (editado)".
- Resultado esperado: o card certo muda, sem duplicar.
- Resultado obtido: o formulário abriu preenchido com os dados de "Parasita". Após salvar, só o card de id 2 mudou de título e a lista continuou com 7 cards.
- Passou ou falhou: passou.
- Correção feita: nenhuma.

4. Remover e cancelar a confirmação

- Caso: cliquei em Remover no card "A Origem" e cancelei a confirmação.
- Resultado esperado: o filme continua.
- Resultado obtido: "A Origem" continuou na lista e no `localStorage`.
- Passou ou falhou: passou.
- Correção feita: nenhuma.

5. Busca e filtro de status juntos

- Caso: ativei o filtro "Quero assistir" e busquei "cidade".
- Resultado esperado: os dois critérios se combinam.
- Resultado obtido: apareceu só "Cidade de Deus". "Interestelar", que também é "Quero assistir", ficou de fora pela busca, e os filmes de outros status ficaram de fora pelo filtro.
- Passou ou falhou: passou.
- Correção feita: nenhuma.

6. Recarregar a página

- Caso: recarreguei a página depois de adicionar e editar filmes.
- Resultado esperado: a lista persiste.
- Resultado obtido: os 7 cards voltaram, incluindo o filme adicionado e o título editado.
- Passou ou falhou: passou.
- Correção feita: nenhuma.

7. Esc e Cancelar fecham o modal

- Caso: abri o modal e apertei Esc. Depois abri de novo e cliquei em Cancelar.
- Resultado esperado: o modal fecha nos dois casos.
- Resultado obtido: o modal fechou tanto com Esc quanto com o botão Cancelar.
- Passou ou falhou: passou.
- Correção feita: nenhuma.

8. Primeira visita

- Caso: apaguei a chave `cinetrack:filmes` na aba Application e recarreguei a página.
- Resultado esperado: os 6 filmes canônicos carregam.
- Resultado obtido: carregaram os 6 filmes: A Origem, Parasita, O Auto da Compadecida, Duna: Parte Dois, Interestelar e Cidade de Deus.
- Passou ou falhou: passou.
- Correção feita: nenhuma.

Como nenhum caso falhou, não houve commits `fix:` nesta rodada.


# Ordenação (funcionalidade nova)

- Ordenar por título: a lista ficou em ordem alfabética: A Origem, Central do Brasil, Cidade de Deus, Duna: Parte Dois, Interestelar, O Auto da Compadecida, Parasita (editado). Passou.
- Títulos acentuados: com `localeCompare`, a ordem ficou Amor, Árvore, Ébano, Eclipse, Zelig, com os acentos no lugar certo. Com o `sort()` puro, ficaria Amor, Eclipse, Zelig, Árvore, Ébano. Passou.
- Ordenar por ano: a lista foi do mais antigo para o mais recente (1998, 2000, 2002, 2010, 2014, 2019, 2024). Passou.
- Ordenar por nota: a lista foi da maior para a menor, primeiro as notas 5 e depois as notas 4. Passou.
- Trocar de filtro mantém a ordem: com "Nota" escolhida, o filtro "Assistido" continuou ordenado por nota: A Origem (5), O Auto da Compadecida (5), Central do Brasil (5), Parasita (editado) (4). Passou.
- Ordenar, filtrar e buscar juntos: com o filtro "Assistido", a busca "a" e a ordem por nota, os três critérios se combinaram e a lista saiu na mesma ordem acima. Passou.
- `filmes` não é mutado: comparei o array `filmes` antes e depois de ordenar, e ele permaneceu igual. Passou.
