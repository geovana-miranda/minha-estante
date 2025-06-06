# Minha Estante

MinhaEstante é um aplicativo web voltado para leitores, onde os usuários podem pesquisar por livros, adicioná-los à sua estante pessoal, marcando-os como "lido" ou "quero ler", também é possível favoritá-los e escrever resenhas. 

## Funcionalidades

- **Autenticação de Usuário:** Registro e login com salvamento de dados no localStorage.
- **Header de perfil:** Cada usuário pode personalizar sua estante adicionando uma foto de perfil, um título e uma bio curta.
- **Busca de livros**: O usuário pode pesquisar pelo título do livro desejado.
- **Página do livro:** Exibe detalhes sobre o livro, como título, descrição e imagem.
- **Página do autor:** Exibe detalhes sobre o autor e outras obras públicadas por ele.
- **Adicionar Livro à Estante:** O usuário pode adicionar um livro à sua estante pessoal. No formulário, ele escolhe o status do livro: "quero ler" ou "lido". Se marcar como lido, poderá também avaliar o livro com uma nota e escrever uma resenha.

## Tecnologias Usadas

- **React**: Biblioteca para construir a interface de usuário.
- **React Router**: Para navegação entre páginas.
- **Tailwind:** Estilização da interface com classes utilitárias.
- **UUID**: Para geração de IDs únicos para os usuários.
- **Context API**: Para controle de autenticação e gerenciamento de usuário.
- **Google Books API:** Utilizada para buscar livros.
- **Wikipedia REST API:** Para obter informações biográficas dos autores.
- **React Icons**: Para ícones personalizáveis e de fácil uso na interface.
- **Local Storage**: Para armazenamento dos dados localmente no navegador.


## Como Rodar o Projeto

### Pré-requisitos

- **Node.js** e **npm** instalados. Caso não tenha, instale o [Node.js](https://nodejs.org/).

### Passos

1. Clone este repositório para sua máquina:

    ```bash
    git clone https://github.com/geovana-miranda/flashlearn.git
    ```

2. Acesse a pasta do projeto:

    ```bash
    cd flashlearn
    ```

3. Instale as dependências:

    ```bash
    npm install
    ```

4. Inicie o projeto:

    ```bash
    npm start
    ```

    O aplicativo estará disponível em [http://localhost:3000](http://localhost:3000).
