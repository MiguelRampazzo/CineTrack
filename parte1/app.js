const modal = document.querySelector("#modal");
const form = document.querySelector("#modal #form-filme");
const btnAbrirHeader = document.querySelector("#btn-abrir-modal");
const linkAbrirFooter = document.querySelector("#link-abrir-modal");
const btnCancelar = document.querySelector("#modal button[type='button']");

// Funções para mostrar e esconder
function abrirModal() {
    if (form) form.reset();
    editandoId = null;
    modal.removeAttribute("hidden");
    modal.hidden = false;
}

function fecharModal() {
    modal.setAttribute("hidden", "");
    modal.hidden = true;
}

if (btnAbrirHeader) {
    btnAbrirHeader.addEventListener("click", abrirModal);
}

if (linkAbrirFooter) {
    linkAbrirFooter.addEventListener("click", abrirModal);
}

if (btnCancelar) {
    btnCancelar.addEventListener("click", fecharModal);
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) {
        fecharModal();
    }
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        fecharModal();
    }
});




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


const filmesIniciais = [
    {
        id: 1,
        titulo: "A Origem",
        ano: 2010,
        genero: "Ficção científica",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbY-KG6to1c6TnWtwLvFbPva_pqcffh7UlWiOCjmUFuA&s=10",
        status: "assistido",
        nota: 5,
        comentario: " "
    },
    {
        id: 2,
        titulo: "Parasita",
        ano: 2019,
        genero: "Suspense",
        poster: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m522jnfqqij4ab",
        status: "assistido",
        nota: 4,
        comentario: " "
    },
    {
        id: 3,
        titulo: "O Auto da Compadecida",
        ano: 2000,
        genero: "Comédia",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-zSnnWPCIkWoYomaWdr3SGBMgysXPPP72UHtquNd4yw&s=10",
        status: "assistido",
        nota: 5,
        comentario: " "
    },
    {
        id: 4,
        titulo: "Duna: Parte Dois",
        ano: 2024,
        genero: "Ficção científica",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcrdf5O1qC_1H-8_Maf1tFhlIGilNWhAsY1uRsrzNJKw&s=10",
        status: "assistindo",
        nota: 5,
        comentario: " "
    },
    {
        id: 5,
        titulo: "Interestelar",
        ano: 2014,
        genero: "Ficção científica",
        poster: "https://acdn-us.mitiendanube.com/stores/004/687/740/products/pos-01876-4c8ebd420e08f8359717181254801917-1024-1024.webp",
        status: "quero",
        nota: 5,
        comentario: " "
    },
    {
        id: 6,
        titulo: "Cidade de Deus",
        ano: 2002,
        genero: "Drama / Crime",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVOODxarHc_hK9pYlqJI1dD3nPCjwETr5KSt2V-BaEig&s=10",
        status: "assistido",
        nota: 5,
        comentario: " "
    }
];

const listaElemento = document.querySelector("#lista");

function renderizarCards(filmes) {
    const htmlCards = filmes.map((f) => `
        <article class="card" data-id="${f.id}">
            <img src="${f.poster}" alt="Pôster do filme ${f.titulo}">
            <h2>${f.titulo}</h2>
            <p>${f.ano} · ${f.genero}</p>
            <p>Nota: ${estrelas(f.nota)}</p>
            <span class="badge ${f.status}">${rotuloStatus(f.status)}</span>
            <div class="acoes">
                <button type="button" class="btn-editar">Editar</button>
                <button type="button" class="btn-remover">Remover</button>
            </div>
        </article>
    `).join("");

    listaElemento.innerHTML = htmlCards;
}

renderizarCards(filmesIniciais);


