const filmesIniciais = [
    {
        id: 1,
        titulo: "A Origem",
        ano: 2010,
        genero: "Ficção científica",
        poster: "filmesiniciais/inception.jpg",
        status: "assistido",
        nota: 5,
        comentario: "Revejo sempre"
    },
    {
        id: 2,
        titulo: "Parasita",
        ano: 2019,
        genero: "Suspense",
        poster: "filmesiniciais/parasita.jpg",
        status: "assistido",
        nota: 4,
        comentario: ""
    },
    {
        id: 3,
        titulo: "O Auto da Compadecida",
        ano: 2000,
        genero: "Comédia",
        poster: "filmesiniciais/autoda.jpg",
        status: "assistido",
        nota: 5,
        comentario: " "
    },
    {
        id: 4,
        titulo: "Duna: Parte Dois",
        ano: 2024,
        genero: "Ficção científica",
        poster: "filmesiniciais/duna.jpg",
        status: "assistindo",
        nota: 4,
        comentario: ""
    },
    {
        id: 5,
        titulo: "Interestelar",
        ano: 2014,
        genero: "Ficção científica",
        poster: "filmesiniciais/interestelar.jpg",
        status: "quero",
        nota: 5,
        comentario: ""
    },
    {
        id: 6,
        titulo: "Cidade de Deus",
        ano: 2002,
        genero: "Drama",
        poster: "filmesiniciais/cidade.jpg",
        status: "quero",
        nota: 4,
        comentario: ""
    }
];


const CHAVE_STORAGE = "cinetrack:filmes";

const salvar = () => localStorage.setItem(CHAVE_STORAGE, JSON.stringify(filmes));

function carregar() {
    const dados = localStorage.getItem(CHAVE_STORAGE);
    if (dados) {
        return JSON.parse(dados);
    }
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(filmesIniciais));
    return [...filmesIniciais];
}

let filmes = carregar();
let editandoId = null;


let termoAtual = "";
let statusAtual = "todos";


function aplicarFiltros(lista, opcoes) {
    const termo = opcoes.termo.toLowerCase().trim();
    return lista
        .filter((f) => f.titulo.toLowerCase().includes(termo))
        .filter((f) => opcoes.status === "todos" || f.status === opcoes.status);
}

function atualizar() {
    const visiveis = aplicarFiltros(filmes, { termo: termoAtual, status: statusAtual });
    renderizarCards(visiveis);
    atualizarContadores();
}


const listaElemento = document.querySelector("#lista");
const navFiltros = document.querySelector("nav");
const modal = document.querySelector("#modal");
const form = document.querySelector("#form-filme");
const msgErro = document.querySelector("#msg-erro");
const btnAbrirModal = document.querySelector("#btn-abrir-modal");
const linkAbrirModal = document.querySelector("#link-abrir-modal");
const btnCancelar = document.querySelector("#btn-cancelar");
const campoBusca = document.querySelector("header input[type='search']");


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


function criarCard(f) {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = f.id;

    const img = document.createElement("img");
    img.src = f.poster || "docs/rascunho-tela.jpg";
    img.alt = `Pôster do filme ${f.titulo}`;
    card.append(img);

    const titulo = document.createElement("h2");
    titulo.textContent = f.titulo;

    const info = document.createElement("p");
    info.textContent = `${f.ano} · ${f.genero}`;

    const nota = document.createElement("p");
    nota.textContent = `Nota: ${estrelas(f.nota)}`;

    const badge = document.createElement("span");
    badge.className = `badge ${f.status}`;
    badge.textContent = rotuloStatus(f.status);

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const btnEditar = document.createElement("button");
    btnEditar.type = "button";
    btnEditar.className = "btn-editar";
    btnEditar.textContent = "Editar";

    const btnRemover = document.createElement("button");
    btnRemover.type = "button";
    btnRemover.className = "btn-remover";
    btnRemover.textContent = "Remover";

    acoes.append(btnEditar, btnRemover);
    card.append(titulo, info, nota, badge, acoes);

    return card;
}

function renderizarCards(colecao) {
    if (!listaElemento) return;
    const frag = document.createDocumentFragment();
    colecao.forEach((f) => frag.appendChild(criarCard(f)));
    listaElemento.replaceChildren(frag);
}

function atualizarContadores() {
    const qtdTotal = filmes.length;
    const qtdAssistido = filmes.filter((f) => f.status === "assistido").length;
    const qtdAssistindo = filmes.filter((f) => f.status === "assistindo").length;
    const qtdQuero = filmes.filter((f) => f.status === "quero").length;

    const btnTodos = navFiltros?.querySelector('[data-status="todos"]');
    const btnAssistido = navFiltros?.querySelector('[data-status="assistido"]');
    const btnAssistindo = navFiltros?.querySelector('[data-status="assistindo"]');
    const btnQuero = navFiltros?.querySelector('[data-status="quero"]');

    if (btnTodos) btnTodos.textContent = `Todos (${qtdTotal})`;
    if (btnAssistido) btnAssistido.textContent = `Assistido (${qtdAssistido})`;
    if (btnAssistindo) btnAssistindo.textContent = `Assistindo (${qtdAssistindo})`;
    if (btnQuero) btnQuero.textContent = `Quero assistir (${qtdQuero})`;

    const smallRodape = document.querySelector("footer small");
    if (smallRodape) {
        smallRodape.textContent = `CineTrack © 2026 · ${qtdTotal} filmes cadastrados`;
    }
}


function validarFilme(filme) {
    const erros = [];
    if (!filme.titulo || !filme.titulo.trim()) {
        erros.push("Título é obrigatório.");
    }
    if (isNaN(filme.ano) || filme.ano < 1888 || filme.ano > 2030) {
        erros.push("Ano deve ser entre 1888 e 2030.");
    }
    if (!filme.genero || !filme.genero.trim()) {
        erros.push("Gênero é obrigatório.");
    }
    if (isNaN(filme.nota) || filme.nota < 1 || filme.nota > 5) {
        erros.push("Nota deve ser entre 1 e 5.");
    }
    return { valido: erros.length === 0, erros };
}

const gerarId = (lista) => Math.max(0, ...lista.map((f) => f.id)) + 1;


const abrir = () => {
    if (msgErro) msgErro.hidden = true;
    modal.hidden = false;
};

const fechar = () => {
    modal.hidden = true;
    editandoId = null;
    form.reset();
    if (msgErro) {
        msgErro.hidden = true;
        msgErro.textContent = "";
    }
};

btnAbrirModal?.addEventListener("click", () => {
    editandoId = null;
    form.reset();
    modal.querySelector("h2").textContent = "Adicionar filme";
    abrir();
});

linkAbrirModal?.addEventListener("click", () => {
    editandoId = null;
    form.reset();
    modal.querySelector("h2").textContent = "Adicionar filme";
    abrir();
});

btnCancelar?.addEventListener("click", fechar);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) fechar();
});

modal?.addEventListener("click", (e) => {
    if (e.target === modal) fechar();
});


form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const dados = Object.fromEntries(new FormData(form));
    dados.ano = Number(dados.ano);
    dados.nota = Number(dados.nota);

    const { valido, erros } = validarFilme(dados);
    if (!valido) {
       
        if (msgErro) {
            msgErro.textContent = erros.join("\n");
            msgErro.hidden = false;
        }
        return;
    }

    if (editandoId !== null) {

        filmes = filmes.map((f) => (f.id === editandoId ? { ...f, ...dados } : f));
    } else {

        filmes = [...filmes, { id: gerarId(filmes), ...dados }];
    }

    salvar();
    atualizar();
    fechar();
});


listaElemento?.addEventListener("click", (e) => {

    const btnRemover = e.target.closest(".btn-remover");
    if (btnRemover) {
        if (!confirm("Remover este filme?")) return;
        const card = btnRemover.closest(".card");
        const id = Number(card.dataset.id);

        filmes = filmes.filter((f) => f.id !== id);
        salvar();
        atualizar();
        return;
    }

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
            abrir();
        }
    }
});


navFiltros?.addEventListener("click", (e) => {
    const botao = e.target.closest("button");
    if (!botao) return;

    navFiltros.querySelector(".ativo")?.classList.remove("ativo");
    botao.classList.add("ativo");

    statusAtual = botao.dataset.status;
    atualizar();
});


function debounce(fn, ms = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    };
}

if (campoBusca) {
    const aoDigitar = (e) => {
        termoAtual = e.target.value;
        atualizar();
    };

    campoBusca.addEventListener("input", debounce(aoDigitar, 300));
}


atualizar();