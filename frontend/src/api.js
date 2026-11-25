// src/api.js
const BASE = "http://localhost:3000";

async function pedir(caminho, opcoes = {}) {
  const r = await fetch(BASE + caminho, {
    headers: { "Content-Type": "application/json" },
    ...opcoes,
  });
  if (!r.ok) {
    // tenta ler o corpo de erro da API:
    // { erros: [...] } (400) ou { erro: "..." } (404)
    const corpo = await r.json().catch(() => ({}));
    const erros = corpo.erros
      ?? (corpo.erro ? [corpo.erro] : [`HTTP ${r.status}`]);
    const e = new Error(erros.join("; "));
    e.erros = erros;
    throw e;
  }
  return r.status === 204 ? null : r.json();
}

export const listar = () => pedir("/filmes");

export const criar = (f) =>
  pedir("/filmes",
    { method: "POST", body: JSON.stringify(f) });

export const atualizar = (id, f) =>
  pedir(`/filmes/${id}`,
    { method: "PUT", body: JSON.stringify(f) });

export const remover = (id) =>
  pedir(`/filmes/${id}`, { method: "DELETE" });
