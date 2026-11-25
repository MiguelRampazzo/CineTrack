// src/components/Filtros.jsx
// No topo, fora do componente
const STATUS = [
  { valor: "todos",
    rotulo: "Todos" },
  { valor: "assistido",
    rotulo: "Assistido" },
  { valor: "assistindo",
    rotulo: "Assistindo" },
  { valor: "quero",
    rotulo: "Quero assistir" },
];

function Filtros({
  ativo, aoMudar, contagem, ordem, aoOrdenar,
}) {
  return (
    <nav aria-label="Filtros de status">
      {STATUS.map((s) => (
        <button key={s.valor}
          type="button"
          className={
            ativo === s.valor ? "ativo" : ""
          }
          onClick={() => aoMudar(s.valor)}
        >
          {s.rotulo} ({contagem[s.valor] ?? 0})
        </button>
      ))}
      <select id="ordenar" aria-label="Ordenar por"
        value={ordem}
        onChange={(e) => aoOrdenar(e.target.value)}>
        <option value="titulo">Título</option>
        <option value="ano">Ano</option>
        <option value="nota">Nota</option>
      </select>
    </nav>
  );
}

export default Filtros;
