    const API_URL = "http://localhost:8080/api/petshop";

    let editingId = null;
    let products = [];

    const form = document.getElementById("productForm");
    const productList = document.getElementById("productList");
    const message = document.getElementById("message");


    // GET - Listar produtos
    async function loadProducts() {

    try {

    const response = await fetch(API_URL);

    if (!response.ok) {
    throw new Error("Erro ao buscar produtos");
}

    products = await response.json();

    renderProducts();

} catch (error) {

    productList.innerHTML = `
                <tr>
                    <td colspan="6" class="empty">
                        Não foi possível conectar à API.
                    </td>
                </tr>
            `;

    showMessage("Erro ao carregar produtos!", "red");
    console.error(error);
}
}


    // Renderizar produtos na tabela
    function renderProducts() {

    const search = document.getElementById("search")
    .value.toLowerCase();

    const filtered = products.filter(product =>
    String(product.nome ?? "").toLowerCase().includes(search)
    );

    if (filtered.length === 0) {

    productList.innerHTML = `
                <tr>
                    <td colspan="6" class="empty">
                        Nenhum produto encontrado.
                    </td>
                </tr>
            `;

    return;
}

    productList.innerHTML = filtered.map(product => `

            <tr>
                <td>${product.id}</td>
                <td>${escapeHTML(product.nome)}</td>
                <td>${escapeHTML(product.categoria)}</td>
                <td>${Number(product.valor).toLocaleString(
    "pt-BR",
{ style: "currency", currency: "BRL" }
    )}</td>
                <td>${escapeHTML(product.fabricante)}</td>

                <td>
                    <div class="actions">

                        <button class="btn-edit"
                            onclick="editProduct(${product.id})">
                            Editar
                        </button>

                        <button class="btn-delete"
                            onclick="deleteProduct(${product.id})">
                            Excluir
                        </button>

                    </div>
                </td>
            </tr>

        `).join("");

}


    // Evitar inserir HTML vindo da API
    function escapeHTML(value) {

    return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
})[char]);

}


    // POST - Cadastrar produto
    // PUT - Atualizar produto
    form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const produto = {

    nome: document.getElementById("nome").value,
    categoria: document.getElementById("categoria").value,
    valor: Number(document.getElementById("valor").value),
    fabricante: document.getElementById("fabricante").value

};

    try {

    let response;

    if (editingId === null) {

    response = await fetch(API_URL, {

    method: "POST",

    headers: {
    "Content-Type": "application/json"
},

    body: JSON.stringify(produto)

});

} else {

    response = await fetch(`${API_URL}/${editingId}`, {

    method: "PUT",

    headers: {
    "Content-Type": "application/json"
},

    body: JSON.stringify(produto)

});

}

    if (!response.ok) {
    throw new Error("Erro na operação");
}

    const result = await response.text();

    showMessage(
    result || (editingId === null
    ? "Produto cadastrado!"
    : "Produto atualizado!"),
    "green"
    );

    cancelEdit();
    await loadProducts();

} catch (error) {

    showMessage("Erro ao salvar produto!", "red");
    console.error(error);

}

});


    // Preencher formulário para edição
    function editProduct(id) {

    const product = products.find(p => p.id === id);

    if (!product) return;

    editingId = id;

    document.getElementById("nome").value = product.nome;

    document.getElementById("categoria").value =
    product.categoria;

    document.getElementById("valor").value = product.valor;

    document.getElementById("fabricante").value =
    product.fabricante;

    document.getElementById("formTitle").textContent =
    "Editar Produto";

    document.getElementById("saveButton").textContent =
    "Salvar Alterações";

    document.getElementById("cancelButton").hidden = false;

    window.scrollTo({
    top: 0,
    behavior: "smooth"
});

}


    // DELETE - Excluir produto
    async function deleteProduct(id) {

    if (!confirm("Deseja realmente excluir este produto?")) {
    return;
}

    try {

    const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
});

    if (!response.ok) {
    throw new Error("Erro ao excluir produto");
}

    const result = await response.text();

    showMessage(result, "green");

    await loadProducts();

} catch (error) {

    showMessage("Erro ao excluir produto!", "red");
    console.error(error);

}

}


    // Cancelar edição
    function cancelEdit() {

    editingId = null;

    form.reset();

    document.getElementById("formTitle").textContent =
    "Cadastrar Produto";

    document.getElementById("saveButton").textContent =
    "Cadastrar Produto";

    document.getElementById("cancelButton").hidden = true;

}


    // Exibir mensagens
    function showMessage(text, color) {

    message.textContent = text;
    message.style.color = color;

    setTimeout(() => {
    message.textContent = "";
}, 4000);

}


    // Pesquisa
    document.getElementById("search")
    .addEventListener("input", renderProducts);


    // Inicialização
    loadProducts();

