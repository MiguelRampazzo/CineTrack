// seed.js
const fs = require("fs");
const path = require("path");

const filmes = [
  {
    id: 1,
    titulo: "A Origem",
    ano: 2010,
    genero: "Ficção científica",
    nota: 5,
    status: "assistido",
    comentario: "Revejo sempre",
    poster: "/filmesiniciais/inception.jpg",
  },
  {
    id: 2,
    titulo: "Parasita",
    ano: 2019,
    genero: "Suspense",
    nota: 4,
    status: "assistido",
    comentario: "",
    poster: "/filmesiniciais/parasita.jpg",
  },
  {
    id: 3,
    titulo: "O Auto da Compadecida",
    ano: 2000,
    genero: "Comédia",
    nota: 5,
    status: "assistido",
    comentario: " ",
    poster: "/filmesiniciais/autoda.jpg",
  },
  {
    id: 4,
    titulo: "Duna: Parte Dois",
    ano: 2024,
    genero: "Ficção científica",
    nota: 4,
    status: "assistindo",
    comentario: "",
    poster: "/filmesiniciais/duna.jpg",
  },
  {
    id: 5,
    titulo: "Interestelar",
    ano: 2014,
    genero: "Ficção científica",
    nota: 5,
    status: "quero",
    comentario: "",
    poster: "/filmesiniciais/interestelar.jpg",
  },
  {
    id: 6,
    titulo: "Cidade de Deus",
    ano: 2002,
    genero: "Drama",
    nota: 4,
    status: "quero",
    comentario: "",
    poster: "/filmesiniciais/cidade.jpg",
  },
];

// caminho absoluto, vale de qualquer pasta
const ARQUIVO =
  path.join(__dirname, "data", "filmes.json");
// cria a pasta data/ se não existir
fs.mkdirSync(path.dirname(ARQUIVO),
  { recursive: true });
fs.writeFileSync(ARQUIVO,
  JSON.stringify(filmes, null, 2));

console.log(`${filmes.length} filmes gravados`);
