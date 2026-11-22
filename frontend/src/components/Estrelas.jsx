// src/components/Estrelas.jsx
function Estrelas({ nota }) {
  return (
    <>
      {"★".repeat(nota) + "☆".repeat(5 - nota)}
    </>
  );
}

export default Estrelas;
