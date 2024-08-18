# URL Shortener

Este é um projeto de encurtador de URLs desenvolvido em Node.js, utilizando Docker e MySQL. O sistema permite criar URLs curtas a partir de URLs longas, gerenciar essas URLs e contabilizar acessos.

## Funcionalidades

- **Cadastro de usuários**: Permite criar e gerenciar contas de usuário.
- **Autenticação de usuários**: Sistema de login seguro para acesso às funcionalidades.
- **Encurtamento de URLs**: Criação de URLs curtas a partir de URLs longas.
- **Gerenciamento de URLs**: Listagem, edição e exclusão lógica de URLs encurtadas.
- **Contabilização de acessos**: Registro e contagem de acessos às URLs encurtadas.

## Tecnologias Utilizadas

- **Typescript**: Linguagem de programação.
- **MySQL**: Banco de dados relacional para armazenar as URLs e informações dos usuários.
- **Docker Compose**: Orquestração de contêineres para gerenciar o ambiente do projeto.
- **AdonisJS**: Presente na versão 6, este framework auxilia no desenvolvimento.

## Configuração do Ambiente

### Pré-requisitos

- Docker e Docker Compose instalados na máquina.
- Git para clonar o repositório.

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as variáveis presentes em: `start/env.ts`.

### Iniciando o Projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/Url-Shortener.git
   cd Url-Shortener
   ```

2. Construa e inicie os contêineres Docker:
   ```bash
   sudo docker-compose up --build
   ```

Este comando irá:

Criar e iniciar um contêiner MySQL.
Criar e iniciar o contêiner da aplicação.
(Opcional) Iniciar contêineres do Adminer e Redis, se configurados.

Após iniciar os contêineres, a aplicação estará disponível em http://localhost:3000 (ou a porta que você configurou).

### EStrutura do projeto:

├── build/ # Arquivos de build da aplicação
├── database_mysql/ # Dados persistidos do MySQL
├── src/ # Código-fonte da aplicação
├── .env # Arquivo de configuração de variáveis de ambiente
├── docker-compose.yml # Arquivo de configuração do Docker Compose
├── Dockerfile # Dockerfile para construir a imagem da aplicação
└── README.md # Documentação do projeto
