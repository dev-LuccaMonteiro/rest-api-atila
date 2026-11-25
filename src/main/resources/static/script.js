const API_URL = "http://localhost:8080";

function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(section => {
        section.classList.add("hidden");
    });

    document.getElementById(sectionId).classList.remove("hidden");
}

// API REQUEST
async function apiRequest(endpoint, method = "GET", data = null) {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json"
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);

    if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

// GENERIC LIST
async function loadList(endpoint, containerId, fields, editFunction) {
    const container = document.getElementById(containerId);

    try {
        const data = await apiRequest(endpoint);

        container.innerHTML = "";

        data.forEach(item => {
            const div = document.createElement("div");
            div.className = "item";

            fields.forEach(field => {
                const p = document.createElement("p");
                p.textContent = `${field.label}: ${item[field.key] ?? "-"}`;
                div.appendChild(p);
            });

            const editButton = document.createElement("button");
            editButton.className = "edit";
            editButton.textContent = "Editar";
            editButton.onclick = () => editFunction(item);

            const deleteButton = document.createElement("button");
            deleteButton.className = "delete";
            deleteButton.textContent = "Excluir";
            deleteButton.onclick = () => deleteItem(endpoint, item.id, containerId);

            div.appendChild(editButton);
            div.appendChild(deleteButton);

            container.appendChild(div);
        });

    } catch (error) {
        container.textContent = "Erro ao carregar informações.";
        console.error(error);
    }
}

// DELETE
async function deleteItem(endpoint, id, containerId) {
    if (!confirm("Deseja realmente excluir este registro?")) {
        return;
    }

    try {
        await apiRequest(`${endpoint}/${id}`, "DELETE");
        alert("Registro excluído com sucesso!");

        refreshLists();

    } catch (error) {
        alert("Erro ao excluir registro.");
        console.error(error);
    }
}

// TUTORES
async function loadTutores() {
    await loadList("/tutores", "tutorList", [
        { key: "nome", label: "Nome" },
        { key: "email", label: "Email" },
        { key: "telefone", label: "Telefone" },
        { key: "endereco", label: "Endereço" }
    ], editTutor);
}

function editTutor(tutor) {
    document.getElementById("tutorId").value = tutor.id;
    document.getElementById("tutorNome").value = tutor.nome;
    document.getElementById("tutorEmail").value = tutor.email;
    document.getElementById("tutorTelefone").value = tutor.telefone;
    document.getElementById("tutorEndereco").value = tutor.endereco;
}

// VETERINARIOS
async function loadVeterinarios() {
    await loadList("/veterinarios", "veterinarioList", [
        { key: "nome", label: "Nome" },
        { key: "crmv", label: "CRMV" },
        { key: "especialidade", label: "Especialidade" },
        { key: "telefone", label: "Telefone" }
    ], editVeterinario);
}

function editVeterinario(vet) {
    document.getElementById("veterinarioId").value = vet.id;
    document.getElementById("vetNome").value = vet.nome;
    document.getElementById("vetCrmv").value = vet.crmv;
    document.getElementById("vetEspecialidade").value = vet.especialidade;
    document.getElementById("vetTelefone").value = vet.telefone;
}

// CONSULTAS
async function loadConsultas() {
    await loadList("/consultas", "consultaList", [
        { key: "petId", label: "ID Pet" },
        { key: "veterinarioId", label: "ID Veterinário" },
        { key: "data", label: "Data" },
        { key: "descricao", label: "Descrição" },
        { key: "status", label: "Status" }
    ], editConsulta);
}

function editConsulta(consulta) {
    document.getElementById("consultaId").value = consulta.id;
    document.getElementById("consultaPetId").value = consulta.petId;
    document.getElementById("consultaVetId").value = consulta.veterinarioId;
    document.getElementById("consultaData").value = consulta.data;
    document.getElementById("consultaDescricao").value = consulta.descricao;
    document.getElementById("consultaStatus").value = consulta.status;
}

// VACINAS
async function loadVacinas() {
    await loadList("/vacinas", "vacinaList", [
        { key: "petId", label: "ID Pet" },
        { key: "nome", label: "Vacina" },
        { key: "fabricante", label: "Fabricante" },
        { key: "dataAplicacao", label: "Aplicação" },
        { key: "proximaDose", label: "Próxima Dose" }
    ], editVacina);
}

function editVacina(vacina) {
    document.getElementById("vacinaId").value = vacina.id;
    document.getElementById("vacinaPetId").value = vacina.petId;
    document.getElementById("vacinaNome").value = vacina.nome;
    document.getElementById("vacinaFabricante").value = vacina.fabricante;
    document.getElementById("vacinaData").value = vacina.dataAplicacao;
    document.getElementById("vacinaProximaDose").value = vacina.proximaDose || "";
}

// FORM SUBMISSIONS
async function submitForm(formId, endpoint, fields, idField, refreshFunction) {
    const form = document.getElementById(formId);

    form.addEventListener("submit", async event => {
        event.preventDefault();

        const id = document.getElementById(idField).value;
        const data = {};

        fields.forEach(field => {
            const element = document.getElementById(field);
            data[field] = element.value;
        });

        if (data.petId) data.petId = Number(data.petId);
        if (data.veterinarioId) data.veterinarioId = Number(data.veterinarioId);

        try {
            if (id) {
                await apiRequest(`${endpoint}/${id}`, "PUT", data);
                alert("Registro atualizado!");
            } else {
                await apiRequest(endpoint, "POST", data);
                alert("Registro cadastrado!");
            }

            form.reset();
            document.getElementById(idField).value = "";

            refreshFunction();

        } catch (error) {
            alert("Erro ao salvar registro. Verifique os dados.");
            console.error(error);
        }
    });
}

// REFRESH
function refreshLists() {
    loadTutores();
    loadVeterinarios();
    loadConsultas();
    loadVacinas();
}

// INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {

    submitForm("tutorForm", "/tutores", [
        "nome", "email", "telefone", "endereco"
    ], "tutorId", loadTutores);

    submitForm("veterinarioForm", "/veterinarios", [
        "nome", "crmv", "especialidade", "telefone"
    ], "veterinarioId", loadVeterinarios);

    submitForm("consultaForm", "/consultas", [
        "petId", "veterinarioId", "data", "descricao", "status"
    ], "consultaId", loadConsultas);

    submitForm("vacinaForm", "/vacinas", [
        "petId", "nome", "fabricante", "dataAplicacao", "proximaDose"
    ], "vacinaId", loadVacinas);

    refreshLists();
});