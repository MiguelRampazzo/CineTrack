export function mediaNotas(lista) {
    const soma = lista.reduce((total, filme) => total + filme.nota, 0);
    return Math.round((soma / lista.length) * 10) / 10;
}

export function contagemPorStatus(lista) {
    return lista.reduce((contagem, filme) => {
        contagem[filme.status] = (contagem[filme.status] || 0) + 1;
        return contagem;
    }, {});
}

export function ordenarPorNota(lista) {
    return [...lista].sort((a, b) => b.nota - a.nota);
}
