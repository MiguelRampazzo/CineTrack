// server.js
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());         // libera o frontend
app.use(morgan("dev"));  // loga cada req
app.use(express.json()); // JSON -> req.body

const ARQUIVO =
  path.join(__dirname, "data", "filmes.json");

function lerFilmes() {
  return JSON.parse(
    fs.readFileSync(ARQUIVO, "utf8"));
}

function salvarFilmes(lista) {
  fs.writeFileSync(ARQUIVO,
    JSON.stringify(lista, null, 2));
}

// Estatísticas (portadas da ANP 05)
function contagemPorStatus(lista) {
  return lista.reduce((contagem, filme) => {
    contagem[filme.status] = (contagem[filme.status] || 0) + 1;
    return contagem;
  }, {});
}

function mediaNotas(lista) {
  // ignora filmes sem nota numérica (ex.: criados sem nota)
  const comNota = lista.filter(
    (filme) => typeof filme.nota === "number");
  if (comNota.length === 0) return 0;
  const soma = comNota.reduce(
    (total, filme) => total + filme.nota, 0);
  return Math.round((soma / comNota.length) * 10) / 10;
}

// Validação (portada de validarFilme da Parte 1).
// Devolve TODOS os problemas de uma vez; lista
// vazia significa que o filme é válido.
const STATUS_VALIDOS = ["assistido", "assistindo", "quero"];

function validarFilme(filme) {
  const erros = [];
  if (typeof filme.titulo !== "string" || !filme.titulo.trim())
    erros.push("titulo é obrigatório");
  if (!Number.isInteger(filme.ano) || filme.ano < 1888 || filme.ano > 2030)
    erros.push("ano deve ser um número entre 1888 e 2030");
  if (!Number.isInteger(filme.nota) || filme.nota < 1 || filme.nota > 5)
    erros.push("nota deve estar entre 1 e 5");
  if (!STATUS_VALIDOS.includes(filme.status))
    erros.push("status deve ser assistido, assistindo ou quero");
  return erros;
}

function gerarId(lista) {
  const ids = lista.map((filme) => filme.id);
  return Math.max(0, ...ids) + 1;
}

app.get("/filmes", (req, res) => {
  let lista = lerFilmes();
  if (req.query.status)
    lista = lista.filter(
      f => f.status === req.query.status);
  // ?q= busca por substring no título, sem
  // diferenciar maiúsculas; combina com ?status=
  if (req.query.q) {
    const q = String(req.query.q).toLowerCase();
    lista = lista.filter(
      f => f.titulo.toLowerCase().includes(q));
  }
  res.json(lista);
});

app.get("/stats", (req, res) => {
  const lista = lerFilmes();
  res.json({
    total: lista.length,
    porStatus: contagemPorStatus(lista),
    mediaNotas: mediaNotas(lista),
  });
});

app.get("/filmes/:id", (req, res) => {
  const id = Number(req.params.id);
  const filme = lerFilmes()
    .find(f => f.id === id);
  if (!filme) return res.status(404)
    .json({ erro: "Filme não encontrado" });
  res.json(filme);
});

app.post("/filmes", (req, res) => {
  const dados = req.body || {};
  const erros = validarFilme(dados);
  if (erros.length > 0)
    return res.status(400).json({ erros });
  const lista = lerFilmes();
  const novo = { id: gerarId(lista), ...dados };
  lista.push(novo);
  salvarFilmes(lista);
  res.status(201).json(novo);
});

app.put("/filmes/:id", (req, res) => {
  const id = Number(req.params.id);
  const lista = lerFilmes();
  const i = lista.findIndex(f => f.id === id);
  if (i === -1) return res.status(404)
    .json({ erro: "Filme não encontrado" });
  // mantém o id, mesmo que o body traga outro
  const atualizado = { ...lista[i], ...req.body, id };
  // mesma validação do POST, sobre o filme final
  const erros = validarFilme(atualizado);
  if (erros.length > 0)
    return res.status(400).json({ erros });
  lista[i] = atualizado;
  salvarFilmes(lista);
  res.json(lista[i]);
});

app.delete("/filmes/:id", (req, res) => {
  const id = Number(req.params.id);
  const lista = lerFilmes();
  if (!lista.some(f => f.id === id))
    return res.status(404)
      .json({ erro: "Filme não encontrado" });
  salvarFilmes(lista.filter(f => f.id !== id));
  res.sendStatus(204); // sucesso, sem corpo
});

// Rota inexistente: 404 em JSON (o padrão do
// Express seria uma página HTML)
app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

// Tratador de erros (4 parâmetros): também
// responde em JSON, sem expor o stack trace
app.use((err, req, res, next) => {
  // corpo com JSON malformado (express.json)
  if (err.type === "entity.parse.failed")
    return res.status(400).json({
      erros: ["corpo da requisição não é um JSON válido"],
    });
  console.error(err);
  res.status(500).json({ erro: "Erro interno do servidor" });
});

const porta = process.env.PORT || 3000;
app.listen(porta, () =>
  console.log(`API na porta ${porta}`));
