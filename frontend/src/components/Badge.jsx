// src/components/Badge.jsx
const ROTULOS = {
  assistido: "Assistido",
  assistindo: "Assistindo",
  quero: "Quero assistir",
};

function Badge({ status }) {
  return (
    <span className={`badge ${status}`}>
      {ROTULOS[status]}
    </span>
  );
}

export default Badge;
