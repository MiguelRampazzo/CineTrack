// src/App.jsx
import { useState, useEffect }
  from "react";
import {
  listar, criar, atualizar, remover,
} from "./api.js";
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

// Mesmos critérios da Parte 1: título respeitando
// acentos, ano crescente e nota decrescente
function ordenar(lista, criterio) {
  const copia = [...lista];
  if (criterio === "ano")
    return copia.sort((a, b) => a.ano - b.ano);
  if (criterio === "nota")
    return copia.sort((a, b) => b.nota - a.nota);
  return copia.sort((a, b) =>
    a.titulo.localeCompare(b.titulo, "pt-BR"));
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
  const [ordem, setOrdem] = useState("titulo");
  // null: fechado; {}: novo; com id: edição
  const [editando, setEditando] =
    useState(null);
  // erros devolvidos pela API ao salvar
  const [errosForm, setErrosForm] = useState([]);

  function abrirModal(filme) {
    setErrosForm([]);
    setEditando(filme);
  }

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

  // Primeiro a API, depois o estado:
  // se o fetch falhar, a tela não mente
  async function salvar(dados) {
    try {
      if (editando.id) {
        const at = await atualizar(editando.id, dados);
        setFilmes((fs) => fs.map(
          (f) => f.id === at.id ? at : f));
      } else {
        const novo = await criar(dados);
        setFilmes((fs) => [...fs, novo]);
      }
      setEditando(null);
      setErrosForm([]);
    } catch (e) {
      // mostra no modal, que continua aberto
      setErrosForm(e.erros ?? [e.message]);
    }
  }

  async function removerFilme(id) {
    if (!confirm("Remover este filme?")) return;
    try {
      await remover(id);
      setFilmes((fs) => fs.filter((f) => f.id !== id));
    } catch (e) {
      alert(`Não foi possível remover: ${e.message}`);
    }
  }

  const filtrados = filmes
    .filter((filme) =>
      status === "todos" ||
      filme.status === status)
    .filter((filme) =>
      filme.titulo
        .toLowerCase()
        .includes(busca.toLowerCase()));
  const visiveis = ordenar(filtrados, ordem);

  // contadores dos botões de filtro
  const contagem = { todos: filmes.length };
  for (const f of filmes)
    contagem[f.status] = (contagem[f.status] ?? 0) + 1;

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
        aoEditar={abrirModal}
        aoRemover={removerFilme}
      />
    );
  }

  return (
    <>
      <Header
        busca={busca}
        aoBuscar={setBusca}
        aoAdicionar={() => abrirModal({})}
      />
      <Filtros
        ativo={status}
        aoMudar={setStatus}
        contagem={contagem}
        ordem={ordem}
        aoOrdenar={setOrdem}
      />
      <main>{conteudo}</main>
      <footer>
        <p>
          <button type="button" className="link-adicionar"
            onClick={() => abrirModal({})}>
            Adicionar novo filme
          </button>
        </p>
        <small>
          CineTrack © 2026 · {filmes.length} filmes cadastrados
          {visiveis.length !== filmes.length &&
            ` · exibindo ${visiveis.length}`}
        </small>
      </footer>
      {editando !== null && (
        <ModalFilme
          filme={editando}
          erros={errosForm}
          aoSalvar={salvar}
          aoFechar={() => setEditando(null)}
        />
      )}
    </>
  );
}

export default App;
