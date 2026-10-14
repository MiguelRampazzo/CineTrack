const filmesIniciais = [
    {
        id: 1,
        titulo: "A Origem",
        ano: 2010,
        genero: "Ficção científica",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbY-KG6to1c6TnWtwLvFbPva_pqcffh7UlWiOCjmUFuA&s=10",
        status: "assistido",
        nota: 5,
        comentario: ""
    },
    {
        id: 2,
        titulo: "Parasita",
        ano: 2019,
        genero: "Suspense",
        poster: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m522jnfqqij4ab",
        status: "assistido",
        nota: 4,
        comentario: ""
    },
    {
        id: 3,
        titulo: "O Auto da Compadecida",
        ano: 2000,
        genero: "Comédia",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-zSnnWPCIkWoYomaWdr3SGBMgysXPPP72UHtquNd4yw&s=10",
        status: "assistido",
        nota: 5,
        comentario: ""
    },
    {
        id: 4,
        titulo: "Duna: Parte Dois",
        ano: 2024,
        genero: "Ficção científica",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcrdf5O1qC_1H-8_Maf1tFhlIGilNWhAsY1uRsrzNJKw&s=10",
        status: "assistindo",
        nota: 5,
        comentario: ""
    },
    {
        id: 5,
        titulo: "Interestelar",
        ano: 2014,
        genero: "Ficção científica",
        poster: "https://acdn-us.mitiendanube.com/stores/004/687/740/products/pos-01876-4c8ebd420e08f8359717181254801917-1024-1024.webp",
        status: "quero",
        nota: 5,
        comentario: ""
    },
    {
        id: 6,
        titulo: "Cidade de Deus",
        ano: 2002,
        genero: "Drama / Crime",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVOODxarHc_hK9pYlqJI1dD3nPCjwETr5KSt2V-BaEig&s=10",
        status: "assistido",
        nota: 5,
        comentario: ""
    }
];

let filmes = [...filmesIniciais];
let editandoId = null;

const listaElemento = document.querySelector("#lista");
const navFiltros = document.querySelector("nav");
const modal = document.querySelector("#modal");
const form = document.querySelector("#form-filme");
const btnAbrirModal = document.querySelector("#btn-abrir-modal");
const linkAbrirModal = document.querySelector("#link-abrir-modal");
const btnCancelar = document.querySelector("#btn-cancelar");

function rotuloStatus(status) {
    if (status === "assistido") return "Assistido";
    if (status === "assistindo") return "Assistindo";
    if (status === "quero") return "Quero assistir";
    return status;
}

const estrelas = (nota) => {
    let resultado = "";
    for (let i = 1; i <= 5; i++) {
        resultado += i <= nota ? "★" : "☆";
    }
    return resultado;
};

function atualizarContadores() {
    const qtdTotal = filmes.length;
    const qtdAssistido = filmes.filter((f) => f.status === "assistido").length;
    const qtdAssistindo = filmes.filter((f) => f.status === "assistindo").length;
    const qtdQuero = filmes.filter((f) => f.status === "quero").length;

    const btnTodos = navFiltros.querySelector('[data-status="todos"]');
    const btnAssistido = navFiltros.querySelector('[data-status="assistido"]');
    const btnAssistindo = navFiltros.querySelector('[data-status="assistindo"]');
    const btnQuero = navFiltros.querySelector('[data-status="quero"]');

    if (btnTodos) btnTodos.textContent = `Todos (${qtdTotal})`;
    if (btnAssistido) btnAssistido.textContent = `Assistido (${qtdAssistido})`;
    if (btnAssistindo) btnAssistindo.textContent = `Assistindo (${qtdAssistindo})`;
    if (btnQuero) btnQuero.textContent = `Quero assistir (${qtdQuero})`;

    const smallRodape = document.querySelector("footer small");
    if (smallRodape) {
        smallRodape.textContent = `CineTrack © 2026 · ${qtdTotal} filmes cadastrados`;
    }
}

function renderizarCards(lista) {
    if (!listaElemento) return;
    listaElemento.innerHTML = lista.map((f) => `
        <article class="card" data-id="${f.id}">
            <img src="${f.poster || 'docs/rascunho-tela.jpg'}" alt="Pôster do filme ${f.titulo}">
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
}

function abrirModal() {
    modal.removeAttribute("hidden");
    modal.hidden = false;
}

function fecharModal() {
    modal.setAttribute("hidden", "");
    modal.hidden = true;
    editandoId = null;
    form.reset();
}

if (btnAbrirModal) {
    btnAbrirModal.addEventListener("click", () => {
        editandoId = null;
        form.reset();
        modal.querySelector("h2").textContent = "Adicionar filme";
        abrirModal();
    });
}

if (linkAbrirModal) {
    linkAbrirModal.addEventListener("click", () => {
        editandoId = null;
        form.reset();
        modal.querySelector("h2").textContent = "Adicionar filme";
        abrirModal();
    });
}

if (btnCancelar) btnCancelar.addEventListener("click", fecharModal);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) fecharModal();
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) fecharModal();
});

const gerarId = (lista) => Math.max(0, ...lista.map((f) => f.id)) + 1;

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const dados = Object.fromEntries(new FormData(form));
    dados.ano = Number(dados.ano);
    dados.nota = Number(dados.nota);

    if (editandoId !== null) {
        // Modo Edição
        filmes = filmes.map((f) => (f.id === editandoId ? { ...f, ...dados } : f));
    } else {
        // Modo Adição
        filmes = [...filmes, { id: gerarId(filmes), ...dados }];
    }

    renderizarCards(filmes);
    atualizarContadores();
    fecharModal();
});

listaElemento.addEventListener("click", (e) => {
    // Remover
    const btnRemover = e.target.closest(".btn-remover");
    if (btnRemover) {
        if (!confirm("Remover este filme?")) return;
        const card = btnRemover.closest(".card");
        const id = Number(card.dataset.id);

        filmes = filmes.filter((f) => f.id !== id);
        renderizarCards(filmes);
        atualizarContadores();
        return;
    }

    // Editar
    const btnEditar = e.target.closest(".btn-editar");
    if (btnEditar) {
        const card = btnEditar.closest(".card");
        editandoId = Number(card.dataset.id);
        const f = filmes.find((item) => item.id === editandoId);

        if (f) {
            form.elements.titulo.value = f.titulo;
            form.elements.ano.value = f.ano;
            form.elements.genero.value = f.genero;
            form.elements.poster.value = f.poster || "";
            form.elements.status.value = f.status;
            form.elements.nota.value = f.nota || "";
            form.elements.comentario.value = f.comentario || "";

            modal.querySelector("h2").textContent = "Editar filme";
            abrirModal();
        }
    }
});

navFiltros.addEventListener("click", (e) => {
    const botao = e.target.closest("button");
    if (!botao) return;

    const anterior = navFiltros.querySelector(".ativo");
    if (anterior) anterior.classList.remove("ativo");
    botao.classList.add("ativo");

    const status = botao.dataset.status;
    const filtrados = filmes.filter((f) => status === "todos" || f.status === status);
    renderizarCards(filtrados);
});

renderizarCards(filmes);
atualizarContadores();