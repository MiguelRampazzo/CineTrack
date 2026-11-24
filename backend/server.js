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
  if (!dados.titulo || !dados.ano)
    return res.status(400)
      .json({ erro: "Dados obrigatórios" });
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
  lista[i] = { ...lista[i], ...req.body, id };
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

const porta = process.env.PORT || 3000;
app.listen(porta, () =>
  console.log(`API na porta ${porta}`));
