// src/components/CardFilme.jsx
// No topo, fora do componente
function estrelas(nota) {
  return "★".repeat(nota) +
    "☆".repeat(5 - nota);
}

const ROTULOS = {
  assistido: "Assistido",
  assistindo: "Assistindo",
  quero: "Quero assistir",
};

function CardFilme({ filme, aoEditar, aoRemover }) {
  return (
    <article className="card">
      <img src={filme.poster} alt="" />
      <h2>{filme.titulo}</h2>
      <p>{filme.ano} · {filme.genero}</p>
      <p>Nota: {estrelas(filme.nota)}</p>
      <span className={`badge ${filme.status}`}>
        {ROTULOS[filme.status]}
      </span>
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
