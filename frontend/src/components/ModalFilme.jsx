// src/components/ModalFilme.jsx
import { useState, useEffect } from "react";
import { validarFilme } from "../validacao.js";

// No topo, fora do componente
const VAZIO = {
  titulo: "",
  ano: "",
  genero: "",
  poster: "",
  status: "quero",
  nota: 3,
  comentario: "",
};

function ModalFilme({
  filme, erros = [], aoSalvar, aoFechar,
}) {
  const [dados, setDados] = useState({
    ...VAZIO,
    ...filme,
  }); /* spread merge */
  // erros da validação local (antes de chamar a API)
  const [errosLocais, setErrosLocais] = useState([]);
  // os locais têm prioridade; senão, os da API
  const errosVisiveis =
    errosLocais.length > 0 ? errosLocais : erros;

  // Esc fecha o modal, como na Parte 1
  useEffect(() => {
    function teclar(e) {
      if (e.key === "Escape") aoFechar();
    }
    document.addEventListener("keydown", teclar);
    return () =>
      document.removeEventListener("keydown", teclar);
  }, [aoFechar]);

  function atualizar(campo, valor) {
    setDados((anteriores) => ({
      ...anteriores,
      [campo]: valor,
    }));
  }

  function submeter(evento) {
    evento.preventDefault();
    const filme = {
      ...dados,
      ano: Number(dados.ano),
      nota: Number(dados.nota),
    };
    // inválido: mostra os erros e não envia nada
    const problemas = validarFilme(filme);
    setErrosLocais(problemas);
    if (problemas.length > 0) return;
    aoSalvar(filme);
  }

  return (
    // clique fora do conteúdo (no fundo) fecha
    <div id="modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) aoFechar();
      }}>
      <div className="modal-conteudo">
        <form id="form-filme" onSubmit={submeter}>
          <h2>{filme.id ? "Editar filme" : "Adicionar filme"}</h2>

          {errosVisiveis.length > 0 && (
            <div className="mensagem-erro" role="alert">
              <p>Não foi possível salvar:</p>
              <ul>
                {errosVisiveis.map((msg) => (
                  <li key={msg}>{msg}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="campo">
            <label htmlFor="titulo">Título</label>
            <input id="titulo" type="text"
              value={dados.titulo}
              onChange={(e) =>
                atualizar("titulo", e.target.value)} />
          </div>

          <div className="campo">
            <label htmlFor="ano">Ano</label>
            <input id="ano" type="number"
              value={dados.ano}
              onChange={(e) =>
                atualizar("ano", e.target.value)} />
          </div>

          <div className="campo">
            <label htmlFor="genero">Gênero</label>
            <input id="genero" type="text"
              value={dados.genero}
              onChange={(e) =>
                atualizar("genero", e.target.value)} />
          </div>

          <div className="campo">
            <label htmlFor="poster">URL do pôster</label>
            <input id="poster" type="text"
              value={dados.poster}
              onChange={(e) =>
                atualizar("poster", e.target.value)} />
          </div>

          <div className="campo">
            <label htmlFor="status">Status</label>
            <select id="status" value={dados.status}
              onChange={(e) =>
                atualizar("status", e.target.value)}>
              <option value="assistido">Assistido</option>
              <option value="assistindo">Assistindo</option>
              <option value="quero">Quero assistir</option>
            </select>
          </div>

          <div className="campo">
            <label htmlFor="nota">Nota (1 a 5)</label>
            <input id="nota" type="number" min="1" max="5"
              value={dados.nota}
              onChange={(e) =>
                atualizar("nota", e.target.value)} />
          </div>

          <div className="campo">
            <label htmlFor="comentario">Comentário</label>
            <textarea id="comentario"
              value={dados.comentario}
              onChange={(e) =>
                atualizar("comentario", e.target.value)} />
          </div>

          <div className="botoes">
            <button type="button"
              onClick={aoFechar}>Cancelar</button>
            <button type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalFilme;
