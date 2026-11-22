// src/App.jsx
import { useState, useEffect }
  from "react";
import { gerarId }
  from "./data/filmes.js";
import { listar } from "./api.js";
import Header
  from "./components/Header.jsx";
import Filtros
  from "./components/Filtros.jsx";
import ListaFilmes
  from "./components/ListaFilmes.jsx";
import ModalFilme
  from "./components/ModalFilme.jsx";

const CHAVE_FILTROS = "cinetrack:filtros";

// Lê os filtros salvos; se a chave não existir
// ou o JSON estiver corrompido, devolve os padrões
function lerFiltros() {
  try {
    const salvos = JSON.parse(
      localStorage.getItem(CHAVE_FILTROS));
    return {
      busca: salvos.busca ?? "",
      status: salvos.status ?? "todos",
    };
  } catch {
    return { busca: "", status: "todos" };
  }
}

function App() {
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] =
    useState(true);
  const [erro, setErro] = useState(null);
  const [status, setStatus] =
    useState(() => lerFiltros().status);
  const [busca, setBusca] =
    useState(() => lerFiltros().busca);
  // null: fechado; {}: novo; com id: edição
  const [editando, setEditando] =
    useState(null);

  useEffect(() => {
    listar()
      .then((dados) => setFilmes(dados))
      .catch((erro) => setErro(erro.message))
      .finally(() => setCarregando(false));
  }, []);

  useEffect(() => {
    localStorage.setItem(CHAVE_FILTROS,
      JSON.stringify({ busca, status }));
  }, [busca, status]);

  useEffect(() => {
    document.title =
      `CineTrack (${filmes.length})`;
  }, [filmes.length]);

  function adicionar(novoFilme) {
    setFilmes((anteriores) => [
      ...anteriores,
      {
        ...novoFilme,
        id: gerarId(anteriores),
      },
    ]);
  }

  function remover(id) {
    setFilmes((anteriores) =>
      anteriores.filter((filme) => filme.id !== id));
  }

  function editar(id, alteracoes) {
    setFilmes((anteriores) =>
      anteriores.map((filme) =>
        filme.id === id ? { ...filme, ...alteracoes } : filme));
  }

  function salvar(dados) {
    if (editando.id) {
      editar(editando.id, dados);
    } else {
      adicionar(dados);
    }

    setEditando(null);
  }

  const visiveis = filmes
    .filter((filme) =>
      status === "todos" ||
      filme.status === status)
    .filter((filme) =>
      filme.titulo
        .toLowerCase()
        .includes(busca.toLowerCase()));

  let conteudo;
  if (carregando) {
    conteudo = <p>Carregando...</p>;
  } else if (erro) {
    conteudo = (
      <p className="erro">Erro: {erro}</p>
    );
  } else {
    conteudo = (
      <ListaFilmes
        filmes={visiveis}
        aoEditar={setEditando}
        aoRemover={remover}
      />
    );
  }

  return (
    <>
      <Header
        busca={busca}
        aoBuscar={setBusca}
        aoAdicionar={() => setEditando({})}
      />
      <Filtros
        ativo={status}
        aoMudar={setStatus}
      />
      <p>Exibindo {visiveis.length} de {filmes.length} filmes</p>
      <main>{conteudo}</main>
      {editando !== null && (
        <ModalFilme
          filme={editando}
          aoSalvar={salvar}
          aoFechar={() => setEditando(null)}
        />
      )}
    </>
  );
}

export default App;
