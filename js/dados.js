const livrosIniciais = [
    {
        id: 1,
        titulo: "Cem Anos de Solidão",
        autor: "Gabriel García Márquez",
        categoria: "Romance",
        status: "Lido",
        descricao: "Um clássico da literatura latino-americana sobre a família Buendía.",
    },
    {
        id: 2,
        titulo: "O Nome do Vento",
        autor: "Patrick Rothfuss",
        categoria: "Fantasia",
        status: "Lendo",
        descricao: "A trajetória de Kvothe, um personagem cercado por lendas e mistérios.",
    },
    {
        id: 3,
        titulo: "Sapiens",
        autor: "Yuval Noah Harari",
        categoria: "Não-ficção",
        status: "Lido",
        descricao: "Uma visão geral sobre a história da humanidade.",
    },
    {
        id: 4,
        titulo: "A Hipótese do Amor",
        autor: "Ali Hazelwood",
        categoria: "Romance",
        status: "Quero ler",
        descricao: "Uma comédia romântica ambientada no universo acadêmico.",
    },
    {
        id: 5,
        titulo: "Clean Code",
        autor: "Robert C. Martin",
        categoria: "Tecnologia",
        status: "Lendo",
        descricao: "Livro sobre boas práticas para escrever código mais limpo.",
    },
    {
        id: 6,
        titulo: "Meditações",
        autor: "Marco Aurélio",
        categoria: "Filosofia",
        status: "Lido",
        descricao: "Reflexões filosóficas ligadas ao estoicismo.",
    },
    {
        id: 7,
        titulo: "Steve Jobs",
        autor: "Walter Isaacson",
        categoria: "Biografia",
        status: "Quero ler",
        descricao: "Biografia de um dos nomes mais conhecidos da tecnologia.",
    },
    {
        id: 8,
        titulo: "Eu Sei Por Que o Pássaro Canta na Gaiola",
        autor: "Maya Angelou",
        categoria: "Biografia",
        status: "Lendo",
        descricao: "Obra autobiográfica sobre memória, identidade e superação.",
    },
];

let livros = carregarLivros();

//funcao para carregar os livros do localStorage, caso não haja livros salvos, retorna os livros iniciais
function carregarLivros() {
    const livrosSalvos = localStorage.getItem("livrosMinhaEstante");

    if (livrosSalvos) {
        return JSON.parse(livrosSalvos);
    }

    return livrosIniciais;
}

function salvarLivros() {
    localStorage.setItem("livrosMinhaEstante", JSON.stringify(livros));
}

function selecionarElemento(id) {
    return document.getElementById(id);
}

// Função para criar o card do livro, usando innerHTML para inserir os dados do livro no html
function criarCardLivro(livro) {
    return `
        <article class="cardLivro">

            <div class="capaLivro">
                <small>Minha Estante</small>
                <strong>${livro.titulo}</strong>
            </div>

            <div class="informacoesLivro">

                <h3>${livro.titulo}</h3>

                <p>${livro.autor}</p>

                <div class="etiquetasLivro">
                    <span class="etiqueta">${livro.categoria}</span>
                    <span class="etiqueta">${livro.status}</span>
                </div>

                <p>${livro.descricao}</p>

            </div>

        </article>
    `;
}

// Função para atualizar as estatísticas na página inicial
function atualizarEstatisticas() {
    const totalLivros = selecionarElemento("totalLivros");
    const totalCategorias = selecionarElemento("totalCategorias");
    const totalLidos = selecionarElemento("totalLidos");

    if (!totalLivros || !totalCategorias || !totalLidos) {
        return;
    }

    const categorias = livros.map((livro) => livro.categoria);

    const categoriasUnicas = new Set(categorias);

    const livrosLidos = livros.filter((livro) => livro.status === "Lido");

    totalLivros.textContent = livros.length;
    totalCategorias.textContent = categoriasUnicas.size;
    totalLidos.textContent = livrosLidos.length;
}

// Função para renderizar o último livro lido na página inicial
function renderizarUltimoLivro() {
    const cardUltimoLivro = selecionarElemento("ultimoLivro");

    if (!cardUltimoLivro) {
        return;
    }

    const livrosLidos = livros.filter((livro) => livro.status === "Lido");

    if (livrosLidos.length === 0) {
        cardUltimoLivro.innerHTML = `
            <small>Acabei de ler</small>
            <strong>Nenhum livro concluído</strong>
        `;
        return;
    }

    const ultimoLivro = livrosLidos[livrosLidos.length - 1];

    cardUltimoLivro.innerHTML = `
        <small>Acabei de ler</small>
        <strong>${ultimoLivro.titulo}</strong>
    `;
}

// Função para renderizar os destaques na página inicial
function renderizarDestaques() {
    const destaquesLivros = selecionarElemento("destaquesLivros");

    if (!destaquesLivros) {
        return;
    }

    const destaques = livros.slice(0, 4);

    destaquesLivros.innerHTML = "";

    destaques.forEach((livro) => {
        destaquesLivros.innerHTML += `
            <a href="catalogo.html" class="cardDestaque">

                <div class="capaDestaque">
                    <small>Minha Estante</small>
                    <strong>${livro.titulo}</strong>
                </div>

                <h3>${livro.titulo}</h3>

                <p>${livro.autor}</p>

            </a>
        `;
    });
}

atualizarEstatisticas();
renderizarUltimoLivro();
renderizarDestaques();
