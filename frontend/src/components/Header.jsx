// src/components/Header.jsx
function Header({ busca, aoBuscar }) {
  return (
    <header>
      <h1>CineTrack</h1>
      <input value={busca}
        onChange={(e) =>
          aoBuscar(e.target.value)} />
      <button>+ Adicionar</button>
    </header>
  );
}

export default Header;
