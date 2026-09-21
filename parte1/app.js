function rotuloStatus(status) {
    if (status === "assistido") {
        return "Assistido";
    }
    if (status === "assistindo") {
        return "Assistindo";
    }
    if (status === "quero") {
        return "Quero assistir";
    }
    return status;
}

const estrelas = (nota) => {
    let resultado = "";
    for (let i = 1; i <= 5; i++) {
        resultado += i <= nota ? "★" : "☆";
    }
    return resultado;
};

console.log(rotuloStatus("quero"), estrelas(3));

const primeiroCard = document.querySelector(".card");

if (primeiroCard) {
    const badgePrimeiro = primeiroCard.querySelector(".badge");
    const paragrafos = primeiroCard.querySelectorAll("p");
    const notaPrimeiro = paragrafos[1]; 

    if (badgePrimeiro) {
        badgePrimeiro.textContent = rotuloStatus("assistido");
    }

    if (notaPrimeiro) {
        notaPrimeiro.textContent = `Nota: ${estrelas(5)}`;
    }
}


const TOTAL = 6;
const smallRodape = document.querySelector("footer small");
if (smallRodape) {
    smallRodape.textContent = `CineTrack © 2026 · ${TOTAL} filmes cadastrados`;
}