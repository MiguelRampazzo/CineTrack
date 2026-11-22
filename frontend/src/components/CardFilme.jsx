// src/components/CardFilme.jsx
import Estrelas from "./Estrelas.jsx";
import Badge from "./Badge.jsx";

function CardFilme({ filme, aoEditar, aoRemover }) {
  return (
    <article className="card">
      <img src={filme.poster} alt="" />
      <h2>{filme.titulo}</h2>
      <p>{filme.ano} · {filme.genero}</p>
      <p>Nota: <Estrelas nota={filme.nota} /></p>
      <Badge status={filme.status} />
      <div className="acoes">
        <button onClick={() => aoEditar(filme)}>
          Editar
        </button>
        <button
          onClick={() => aoRemover(filme.id)}>
          Remover
        </button>
      </div>
    </article>
  );
}

export default CardFilme;
