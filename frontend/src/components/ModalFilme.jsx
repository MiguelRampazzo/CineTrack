// src/components/ModalFilme.jsx
import { useState } from "react";

// No topo, fora do componente
const VAZIO = {
  titulo: "",
  ano: "",
  genero: "",
  status: "quero",
  nota: 3,
};

function ModalFilme({
  filme, aoSalvar, aoFechar,
}) {
  const [dados, setDados] = useState({
    ...VAZIO,
    ...filme,
  }); /* spread merge */

  function atualizar(campo, valor) {
    setDados((anteriores) => ({
      ...anteriores,
      [campo]: valor,
    }));
  }

  function submeter(evento) {
    evento.preventDefault();
    aoSalvar({
      ...dados,
      ano: Number(dados.ano),
      nota: Number(dados.nota),
    });
  }

  return (
    <div id="modal">
      <div className="modal-conteudo">
        <form onSubmit={submeter}>
          <label htmlFor="titulo">Título</label>
          <input id="titulo" value={dados.titulo}
            onChange={(e) =>
              atualizar("titulo", e.target.value)} />

          <label htmlFor="ano">Ano</label>
          <input id="ano" type="number" value={dados.ano}
            onChange={(e) =>
              atualizar("ano", e.target.value)} />

          <label htmlFor="genero">Gênero</label>
          <input id="genero" value={dados.genero}
            onChange={(e) =>
              atualizar("genero", e.target.value)} />

          <label htmlFor="status">Status</label>
          <select id="status" value={dados.status}
            onChange={(e) =>
              atualizar("status", e.target.value)}>
            <option value="assistido">Assistido</option>
            <option value="assistindo">Assistindo</option>
            <option value="quero">Quero assistir</option>
          </select>

          <label htmlFor="nota">Nota (1 a 5)</label>
          <input id="nota" type="number" min="1" max="5"
            value={dados.nota}
            onChange={(e) =>
              atualizar("nota", e.target.value)} />

          <button type="button"
            onClick={aoFechar}>Cancelar</button>
          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
}

export default ModalFilme;
