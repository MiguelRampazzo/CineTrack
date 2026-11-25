// src/components/Header.jsx
function Header({ busca, aoBuscar, aoAdicionar }) {
  return (
    <header>
      <h1>CineTrack</h1>
      <form role="search"
        onSubmit={(e) => e.preventDefault()}>
        <input type="search"
          placeholder="Buscar filme"
          aria-label="Buscar filme"
          value={busca}
          onChange={(e) =>
            aoBuscar(e.target.value)} />
      </form>
      <button type="button"
        className="btn-adicionar"
        onClick={aoAdicionar}>
        <span className="btn-texto">+ Adicionar</span>
      </button>
    </header>
  );
}

export default Header;
