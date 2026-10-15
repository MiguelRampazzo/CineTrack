ANP 01: Análise de Tráfego HTTP no DevTools

1.

Site analisado: https://developer.mozilla.org/pt-BR/
Método: GET
URL: https://developer.mozilla.org/pt-BR/
Status Code: 304 Not Modified

---

2.

Arquivo CSS
Recurso / URL: https://developer.mozilla.org/static/client/styles-global.0a2bbf23d6ded3b4.css
Status Code: 200 OK (from memory cache)
Content-Type: text/css;

Arquivo JavaScript
Recurso / URL: https://developer.mozilla.org/static/client/runtime.09248784c518044e.js
Status Code: 200 OK (from disk cache)
Content-Type: text/javascript;

Imagem
Recurso / URL: https://developer.mozilla.org/favicon-192x192.png
Status Code: 200 OK (from disk cache)
Content-Type: image/png

---

3.
URL acessada: https://developer.mozilla.org/pt-BR/oi
Status Code obtido: 404 Not Found
O que mudou na resposta: O código de status passou de 304 para 404 Not Found, informando que o recurso requisitado não foi encontrado

---

4.
Site analisado: YouTube
Método: POST
Caminho (Path): https://www.youtube.com/youtubei/v1/player?prettyPrint=false
Status Code: 200 OK
Content-Type: application/json
Comparação com docs/requisitos.md: Ambas trocam dados sem recarregar a tela, mas enquanto o YouTube usa POST num endpoint de ação (/player) para consultar dados, o CineTrack adota o padrão REST, reservando GET /filmes para consultas e POST /filmes apenas para criar registros.


---

5.
Na Parte 2 do CineTrack terá:
Método: GET
Rota: /filmes
Corpo da Resposta deverá ser um cabeçalho com  Content-Type: application/json e um array contendo os dados de cada filme (id, titulo, ano, genero, poster, status, nota, comentario).