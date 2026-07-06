const formularioLivro = selecionarElemento("formularioLivro");
const tituloLivro = selecionarElemento("tituloLivro");
const autorLivro = selecionarElemento("autorLivro");
const categoriaLivro = selecionarElemento("categoriaLivro");
const descricaoLivro = selecionarElemento("descricaoLivro");
const listaLivrosAdmin = selecionarElemento("listaLivrosAdmin");
const totalLivrosAdmin = selecionarElemento("totalLivrosAdmin");

// Carrega as categorias dos livros já cadastrados
function carregarCategoriasAdmin() {
    if (!categoriaLivro) {
        return;
    }

    const categorias = livros.map((livro) => livro.categoria);
    const categoriasUnicas = [...new Set(categorias)];

    categoriaLivro.innerHTML = `
        <option value="">Selecione uma categoria</option>
    `;

    categoriasUnicas.forEach((categoria) => {
        categoriaLivro.innerHTML += `
            <option value="${categoria}">${categoria}</option>
        `;
    });
}

// Conforme selecionado no formulário, obtém o status de leitura
function obterStatusSelecionado() {
    const statusSelecionado = document.querySelector(
        'input[name="statusLivro"]:checked'
    );

    return statusSelecionado.value;
}

// Classifica o status de leitura, conforme status do livro
function definirClasseStatus(status) {
    if (status === "Lido") {
        return "statusLido";
    }

    if (status === "Lendo") {
        return "statusLendo";
    }

    return "statusQueroLer";
}

// Exibe a lista de livros cadastrados na página administrativa
function renderizarLivrosAdmin() {
    if (!listaLivrosAdmin || !totalLivrosAdmin) {
        return;
    }

    totalLivrosAdmin.textContent = livros.length;
    listaLivrosAdmin.innerHTML = "";

    livros.forEach((livro) => {
        listaLivrosAdmin.innerHTML += `
            <article class="itemLivroAdmin">
                <div class="dadosLivroAdmin">
                    <h3>${livro.titulo}</h3>
                    <p>${livro.autor} · ${livro.categoria}</p>
                </div>

                <span class="etiquetaStatus ${definirClasseStatus(livro.status)}">
                    ${livro.status}
                </span>
            </article>
        `;
    });
}

// Cadastra um novo livro a partir do formulário preenchido
function cadastrarLivro(evento) {
    evento.preventDefault();

    const novoLivro = {
        id: Date.now(),
        titulo: tituloLivro.value.trim(),
        autor: autorLivro.value.trim(),
        categoria: categoriaLivro.value,
        status: obterStatusSelecionado(),
        descricao: descricaoLivro.value.trim(),
    };

    if (
        !novoLivro.titulo ||
        !novoLivro.autor ||
        !novoLivro.categoria ||
        !novoLivro.descricao
    ) {
        alert("Preencha todos os campos antes de salvar o livro.");
        return;
    }

    livros.push(novoLivro);
    salvarLivros();

    formularioLivro.reset();

    carregarCategoriasAdmin();
    renderizarLivrosAdmin();
}

// COnfere se o formulário existe e adicona um novo cadastro
if (formularioLivro) {
    formularioLivro.addEventListener("submit", cadastrarLivro);
}

carregarCategoriasAdmin();
renderizarLivrosAdmin();