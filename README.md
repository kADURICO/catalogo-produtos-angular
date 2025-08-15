# Sistema de Gestão de Produtos

Este projeto é uma aplicação web desenvolvida com Angular que simula um sistema de gestão de produtos. Ele permite listar, visualizar, adicionar, editar e excluir produtos, com um sistema de controle de acesso para diferentes níveis de usuário.

## 🚀 Tecnologias Utilizadas

-   **Angular CLI**: v19.2.12
-   **Angular**: v17
-   **TypeScript**: v5.3.3
-   **Angular Material**: Componentes de UI e UX
-   **Bootstrap**: Para layout e responsividade
-   **RxJS**: Para programação reativa e gerenciamento de dados assíncronos

## 📦 Pré-requisitos

Antes de rodar o projeto, certifique-se de que você tem as seguintes ferramentas instaladas:

-   [Node.js](https://nodejs.org/) (versão LTS recomendada)
-   [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js)
-   [Angular CLI](https://angular.io/cli) (instalado globalmente via npm)

## 🔧 Instalação e Execução

Siga estes passos para configurar e rodar a aplicação:

1.  Clone este repositório para o seu ambiente local:
    ```bash
    git clone https://github.com/kADURICO/catalogo-produtos-angular.git
    ```

2.  Navegue até o diretório do projeto:
    ```bash
    cd catalogo-produtos-angular
    ```

3.  Instale todas as dependências do projeto:
    ```bash
    npm install
    ```

4.  Inicie o servidor de desenvolvimento. A aplicação estará disponível em `http://localhost:4200/`:
    ```bash
    ng serve
    ```

## 📋 Funcionalidades

-   **Autenticação por Papel**: O login é protegido e o acesso às funcionalidades é controlado com base no papel do usuário.
-   **Listagem de Produtos**: Exibe todos os produtos disponíveis em um formato de card.
-   **Filtro por Categoria**: Filtra os produtos por categoria, facilitando a navegação.
-   **Detalhes do Produto**: Visualiza informações detalhadas de cada produto.
-   **Adição de Produtos**: Formulário para adicionar novos produtos (acesso restrito a administradores).
-   **Edição de Produtos**: Formulário para editar produtos existentes (acesso restrito a administradores).
-   **Exclusão com Confirmação**: Exclui produtos após uma confirmação via caixa de diálogo (acesso restrito a administradores).
-   **UI Responsiva**: Layout adaptável a diferentes tamanhos de tela.

## 🔐 Credenciais de Acesso (para Teste)

Use as seguintes credenciais para testar as diferentes permissões do sistema:

-   **Administrador**:
    -   Email: `admin@admin.com`
    -   Senha: `12345`
    -   *Permissões: Acesso total (adicionar, editar, excluir, visualizar).*

-   **Usuário Padrão**:
    -   Email: `user@user.com`
    -   Senha: `12345`
    -   *Permissões: Acesso limitado (apenas visualização de produtos e detalhes).*
