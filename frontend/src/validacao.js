// src/validacao.js
// Validação do formulário, portada de validarFilme
// da Parte 1. Devolve a lista com todos os problemas;
// lista vazia significa que o filme é válido.
const STATUS_VALIDOS = ["assistido", "assistindo", "quero"];

export function validarFilme(filme) {
  const erros = [];
  if (!filme.titulo || !filme.titulo.trim())
    erros.push("Título é obrigatório.");
  if (!Number.isInteger(filme.ano) ||
      filme.ano < 1888 || filme.ano > 2030)
    erros.push("Ano deve ser entre 1888 e 2030.");
  if (!filme.genero || !filme.genero.trim())
    erros.push("Gênero é obrigatório.");
  if (!Number.isInteger(filme.nota) ||
      filme.nota < 1 || filme.nota > 5)
    erros.push("Nota deve ser entre 1 e 5.");
  if (!STATUS_VALIDOS.includes(filme.status))
    erros.push("Status inválido.");
  return erros;
}
