// Função para carregar as categorias únicas no filtro de categoria
function carregarCategorias() {
    const filtroCategoria = selecionarElemento("filtroCategoria");

    if (!filtroCategoria) {
        return;
    }

    const categorias = livros.map((livro) => livro.categoria);
    const categoriasUnicas = [...new Set(categorias)];

    categoriasUnicas.forEach((categoria) => {
        filtroCategoria.innerHTML += `
            <option value="${categoria}">
                ${categoria}
            </option>
        `;
    });
}

// Função para renderizar o catálogo de livros na página
function renderizarCatalogo() {
    const listaLivros = selecionarElemento("listaLivros");
    const contadorCatalogo = selecionarElemento("contadorCatalogo");
    const campoBusca = selecionarElemento("campoBusca");
    const filtroCategoria = selecionarElemento("filtroCategoria");
    const filtroStatus = selecionarElemento("filtroStatus");

    if (!listaLivros) {
        return;
    }

    const textoBusca = campoBusca.value.toLowerCase();
    const categoriaSelecionada = filtroCategoria.value;
    const statusSelecionado = filtroStatus.value;

    const livrosFiltrados = livros.filter((livro) => {
        const buscaConfere =
            livro.titulo.toLowerCase().includes(textoBusca) ||
            livro.autor.toLowerCase().includes(textoBusca);

        const categoriaConfere =
            categoriaSelecionada === "todos" || livro.categoria === categoriaSelecionada;

        const statusConfere = statusSelecionado === "todos" || livro.status === statusSelecionado;

        return buscaConfere && categoriaConfere && statusConfere;
    });

    listaLivros.innerHTML = "";

    if (contadorCatalogo) {
        contadorCatalogo.textContent = livrosFiltrados.length;
    }

    if (livrosFiltrados.length === 0) {
        listaLivros.innerHTML = `<p class="mensagemVazia">Nenhum livro encontrado.</p>`;
        return;
    }

    livrosFiltrados.forEach((livro) => {
        listaLivros.innerHTML += criarCardLivro(livro);
    });
}

// Função para configurar os filtros de busca, categoria e status
function configurarFiltros() {
    const campoBusca = selecionarElemento("campoBusca");
    const filtroCategoria = selecionarElemento("filtroCategoria");
    const filtroStatus = selecionarElemento("filtroStatus");

    if (campoBusca) {
        campoBusca.addEventListener("input", renderizarCatalogo);
    }

    if (filtroCategoria) {
        filtroCategoria.addEventListener("change", renderizarCatalogo);
    }

    if (filtroStatus) {
        filtroStatus.addEventListener("change", renderizarCatalogo);
    }
}

carregarCategorias();
configurarFiltros();
renderizarCatalogo();
