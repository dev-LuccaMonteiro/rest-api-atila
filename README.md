# 🐾 Rest API Atila

<div align="center">

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![REST API](https://img.shields.io/badge/REST-API-02569B?style=for-the-badge)
![Swagger](https://img.shields.io/badge/Swagger-Documentation-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)

**A RESTful API for managing pet-related information.**

[Repository](https://github.com/dev-LuccaMonteiro/rest-api-atila) • [API Documentation (Swagger)](http://localhost:8080/swagger-ui/index.html)

</div>

---

## 📌 About the Project

**Rest API Atila** is a RESTful API project designed to provide structured communication between applications and a backend system responsible for managing pet-related information.

The API allows client applications to communicate with the server through HTTP requests, exchange JSON data, and perform operations through predefined endpoints.

This documentation explains how to configure, run, and consume the API using tools such as:

- Swagger UI
- Postman
- cURL
- JavaScript (Fetch API)
- Java (HttpClient)

## 🚀 Getting Started

To consume the API, you must first have the application running locally or have access to a deployed server.

### Prerequisites

Make sure you have the following tools installed:

- Java Development Kit (JDK), compatible with the project.
- Git.
- An IDE such as IntelliJ IDEA, Eclipse, or VS Code.
- Postman or another HTTP client (optional).

### 1. Clone the Repository

```bash
git clone https://github.com/dev-LuccaMonteiro/rest-api-atila.git
```

### 2. Access the Project

```bash
cd rest-api-atila
```

### 3. Run the Application

Open the project in your preferred IDE and execute the application's main class.

If the project uses Maven Wrapper, you can also run:

**Windows:**

```bash
mvnw.cmd spring-boot:run
```

**Linux / macOS:**

```bash
./mvnw spring-boot:run
```

If Maven is installed globally:

```bash
mvn spring-boot:run
```

Wait until the application finishes starting.

## 🌐 API Information

| Property | Value |
|---|---|
| API Name | Rest API Atila |
| Architecture | REST |
| Data Format | JSON |
| Local Server | `http://localhost:8080` |
| Documentation | Swagger UI |

### Base URL

```text
http://localhost:8080
```

All API requests must use the base URL followed by the endpoint path.

Example:

```text
http://localhost:8080/{endpoint}
```

Replace `{endpoint}` with the actual route provided by the API.

---

## 📚 API Documentation – Swagger

The project provides interactive API documentation through **Swagger UI**.

Swagger allows developers to explore available endpoints, understand request parameters, inspect response structures, and execute HTTP requests directly from the browser.

### Access Swagger UI

With the application running, access:

**http://localhost:8080/swagger-ui/index.html**

### How to Use Swagger

1. Start the application.
2. Open the Swagger documentation URL.
3. Explore the available controllers and endpoints.
4. Select an endpoint to expand its details.
5. Click **Try it out**.
6. Fill in the required parameters or request body.
7. Click **Execute**.
8. Analyze the HTTP response and status code.

Swagger provides the most reliable reference for the actual routes, required fields, and response structures implemented by the API.

---

## 🔗 HTTP Methods

The API can expose different HTTP methods depending on the implemented endpoints.

| Method | Description |
|---|---|
| GET | Retrieves information from the server. |
| POST | Creates a new resource. |
| PUT | Updates an existing resource. |
| PATCH | Partially updates an existing resource. |
| DELETE | Removes a resource. |

Check Swagger UI to identify which methods are available for each resource.

## 📤 Consuming the API

The following examples demonstrate how to send requests to a REST API.

**Note:** Replace the example paths and JSON properties with the exact endpoints and fields displayed in your Swagger documentation.

### 1. GET – Retrieve Information

GET requests are used to retrieve information from the API.

**Example using cURL:**

```bash
curl -X GET "http://localhost:8080/{endpoint}" \
  -H "Accept: application/json"
```

### 2. POST – Create Information

POST requests are used to send information to the server and create a new resource.

**Example using cURL:**

```bash
curl -X POST "http://localhost:8080/{endpoint}" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "field1": "example",
    "field2": "example"
  }'
```

### 3. PUT – Update Information

PUT requests are generally used to update an existing resource.

```bash
curl -X PUT "http://localhost:8080/{endpoint}/{id}" \
  -H "Content-Type: application/json" \
  -d '{
    "field1": "updated value",
    "field2": "updated value"
  }'
```

### 4. DELETE – Remove Information

DELETE requests are used to remove an existing resource.

```bash
curl -X DELETE "http://localhost:8080/{endpoint}/{id}"
```

---

## 💻 Consuming the API with JavaScript

You can integrate the API into a frontend application using the JavaScript Fetch API.

### GET Request

```javascript
const API_URL = "http://localhost:8080";

async function getData() {
    try {
        const response = await fetch(`${API_URL}/{endpoint}`);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

    } catch (error) {
        console.error("Error consuming API:", error);
    }
}

getData();
```

### POST Request

```javascript
const API_URL = "http://localhost:8080";

async function createData() {
    try {
        const response = await fetch(`${API_URL}/{endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                field1: "example",
                field2: "example"
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = await response.json();

        console.log("Created successfully:", result);

    } catch (error) {
        console.error("Error:", error);
    }
}

createData();
```

---

## ☕ Consuming the API with Java

Java applications can communicate with the API using the built-in `HttpClient` class.

### GET Request

```java
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class ApiConsumer {

    public static void main(String[] args) throws Exception {

        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(
                "http://localhost:8080/{endpoint}"
            ))
            .header("Accept", "application/json")
            .GET()
            .build();

        HttpResponse<String> response = client.send(
            request,
            HttpResponse.BodyHandlers.ofString()
        );

        System.out.println("Status: " + response.statusCode());
        System.out.println("Response: " + response.body());
    }
}
```

Replace `{endpoint}` with an available route from Swagger.

---

## 📊 HTTP Response Status Codes

The following are common HTTP status codes used in REST APIs.

| Status Code | Meaning |
|---|---|
| 200 OK | Request successfully processed. |
| 201 Created | Resource successfully created. |
| 204 No Content | Request successful without response content. |
| 400 Bad Request | Invalid request or parameters. |
| 401 Unauthorized | Authentication required or invalid. |
| 403 Forbidden | Access denied. |
| 404 Not Found | Requested resource not found. |
| 405 Method Not Allowed | HTTP method not supported. |
| 409 Conflict | Request conflicts with existing data. |
| 500 Internal Server Error | Unexpected server error. |

Actual responses depend on the implementation of each endpoint.

## 🧪 Testing the API

You can test the API using different tools.

### Swagger UI

The recommended way to explore the available endpoints and test requests interactively.

[Open Swagger Documentation](http://localhost:8080/swagger-ui/index.html)

### Postman

You can also use Postman to manually send HTTP requests.

1. Open Postman.
2. Create a new HTTP request.
3. Select the desired HTTP method.
4. Enter the endpoint URL.
5. Configure the headers.
6. Add a JSON body if required.
7. Click Send.


## 🎯 Demonstração da Solução

### 1. Problema Identificado

O gerenciamento de informações relacionadas a animais de estimação exige uma estrutura organizada para armazenar, consultar e atualizar dados de maneira eficiente.

Sem uma solução centralizada, o acesso às informações pode se tornar desorganizado, dificultando a integração entre diferentes aplicações e o gerenciamento dos dados.

Diante desse cenário, o projeto **Rest API Atila** foi desenvolvido com o objetivo de disponibilizar uma API REST que permita a comunicação padronizada entre aplicações e o backend, facilitando o acesso e o gerenciamento das informações.

### 2. Solução Desenvolvida

A solução consiste em uma API REST responsável por receber requisições HTTP, processar as informações, executar as operações necessárias e retornar respostas estruturadas em JSON.

A API funciona como uma camada intermediária entre a interface consumidora e o banco de dados, centralizando as regras de negócio e o acesso às informações.

Essa arquitetura permite que diferentes interfaces, como aplicações web, sistemas desktop ou aplicativos mobile, utilizem os mesmos serviços disponibilizados pelo backend.

### 3. Decisões Técnicas do Projeto

Durante o desenvolvimento, foram consideradas decisões para garantir organização, manutenção e facilidade de integração.

- **Arquitetura REST:** utilização de padrões HTTP para estruturar a comunicação entre cliente e servidor.
- **JSON:** formato escolhido para transmitir informações entre as aplicações.
- **Separação de responsabilidades:** organização da lógica de negócio e do acesso aos dados no backend.
- **Swagger:** utilização de documentação interativa para facilitar a compreensão e os testes dos endpoints.
- **Banco de dados:** armazenamento persistente das informações utilizadas pela aplicação.
- **Padronização das requisições:** utilização dos métodos GET, POST, PUT e DELETE conforme as operações disponibilizadas.

### 4. Fluxo de Comunicação: Interface, API e Banco de Dados

A comunicação acontece em três etapas principais:

**1. Interface (Frontend / Cliente)**

O usuário interage com uma aplicação que disponibiliza funcionalidades para consultar ou manipular informações. A interface envia requisições HTTP para os endpoints da API.

**2. API (Backend)**

A API recebe as requisições, verifica os dados enviados, executa as regras de negócio e realiza a comunicação com o banco de dados quando necessário.

Após o processamento, o backend retorna uma resposta HTTP contendo o resultado da operação.

**3. Banco de Dados**

O banco de dados é responsável por armazenar e disponibilizar as informações solicitadas pela API. As operações de consulta, inserção, atualização e exclusão são realizadas conforme a necessidade da aplicação.

### 5. Arquitetura da Solução

O fluxo geral de comunicação pode ser representado da seguinte maneira:

```text
       USUÁRIO
          |
          v
   INTERFACE / CLIENTE
     (Frontend)
          |
          | Requisição HTTP
          v
      REST API
      (Backend)
          |
          v
   REGRAS DE NEGÓCIO
          |
          v
    BANCO DE DADOS
          |
          | Resultado da operação
          v
       REST API
          |
          | Resposta HTTP / JSON
          v
   INTERFACE / CLIENTE
          |
          v
       USUÁRIO
```

### 6. Exemplo Prático de Funcionamento

Um exemplo de utilização da solução acontece quando um usuário deseja cadastrar uma nova informação relacionada a um pet.

1. O usuário preenche os dados na interface.
2. A aplicação envia uma requisição HTTP POST para o endpoint correspondente.
3. A API recebe os dados no formato JSON.
4. O backend realiza as validações necessárias.
5. A API executa a operação de persistência no banco de dados.
6. O banco de dados confirma a operação.
7. A API retorna uma resposta HTTP indicando o resultado.
8. A interface apresenta o resultado ao usuário.

Esse mesmo fluxo pode ser adaptado para consultas, atualizações e exclusões, utilizando os respectivos métodos HTTP.

### 7. Demonstração e Testes

Para demonstrar o funcionamento da solução, foi disponibilizada a documentação interativa através do Swagger UI.

Por meio dela, é possível visualizar os endpoints disponíveis, verificar os parâmetros necessários, enviar requisições e analisar as respostas retornadas pela API.

**Documentação Swagger:**

[http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

**Repositório GitHub:**

[https://github.com/dev-LuccaMonteiro/rest-api-atila](https://github.com/dev-LuccaMonteiro/rest-api-atila)

### 8. Resultado Final

O desenvolvimento do Rest API Atila proporciona uma estrutura de backend organizada para disponibilizar informações por meio de serviços REST.

A solução facilita a integração com diferentes aplicações, centraliza o processamento das requisições e estabelece uma comunicação padronizada entre a interface consumidora, o backend e o banco de dados.

Dessa forma, o projeto demonstra a aplicação prática dos conceitos de desenvolvimento backend, arquitetura REST, integração de sistemas e persistência de dados.   

### cURL

You can also test endpoints directly from your terminal using the examples provided above.

---

## ⚠️ Troubleshooting

### Application is not starting

- Verify that the correct Java version is installed.
- Check your project dependencies.
- Verify database configuration if the application uses a database.
- Check the application logs for errors.

### Connection Refused

If you receive a connection error:

- Make sure the application is running.
- Verify that the server is using port `8080`.
- Check whether another application is using the same port.
- Confirm that the request URL is correct.

### 404 – Not Found

- Verify the endpoint path.
- Check the HTTP method.
- Make sure the resource exists.
- Consult Swagger for the correct route.

### 400 – Bad Request

- Verify the JSON structure.
- Check required fields.
- Confirm the expected data types.
- Check request parameters.

---

## 📁 Project Structure

The repository contains a `pet` directory and a README file.

The complete internal source structure and individual classes should be consulted directly in the repository.

[View Project Structure on GitHub](https://github.com/dev-LuccaMonteiro/rest-api-atila/tree/develop)

---

## 🔒 Important Notes

- The local URL `http://localhost:8080` is intended for development and local testing.
- Other developers cannot access your local server through their own computers.
- For external access, deploy the application and replace the local base URL with the public server URL.
- Do not expose database passwords, API keys, or other sensitive credentials.
- Always check Swagger before consuming an endpoint to ensure that the request matches the API implementation.

## 👨‍💻 Author

**Lucca Monteiro**

GitHub: [@dev-LuccaMonteiro](https://github.com/dev-LuccaMonteiro)

Project: [rest-api-atila](https://github.com/dev-LuccaMonteiro/rest-api-atila)

---

<div align="center">

**Developed with dedication and Java ☕**

⭐ If you found this project useful, consider giving it a star!

</div>
