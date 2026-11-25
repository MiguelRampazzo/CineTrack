// src/components/CardFilme.jsx
import Estrelas from "./Estrelas.jsx";
import Badge from "./Badge.jsx";

function CardFilme({ filme, aoEditar, aoRemover }) {
  return (
    <article className="card">
      {filme.poster && (
        <img src={filme.poster}
          alt={`Pôster do filme ${filme.titulo}`} />
      )}
      <h2>{filme.titulo}</h2>
      <p>{filme.ano} · {filme.genero}</p>
      <p>Nota: <Estrelas nota={filme.nota} /></p>
      <Badge status={filme.status} />
      <div className="acoes">
        <button type="button" className="btn-editar"
          onClick={() => aoEditar(filme)}>
          Editar
        </button>
        <button type="button" className="btn-remover"
          onClick={() => aoRemover(filme.id)}>
          Remover
        </button>
      </div>
    </article>
  );
}

export default CardFilme;
