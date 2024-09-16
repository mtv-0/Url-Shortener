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
- Node.js >= 20.6.

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as variáveis presentes em: `start/env.ts`.

### Iniciando o Projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/mtv-0/Url-Shortener.git
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

```
├── build/ # Arquivos de build da aplicação
├── database_mysql/ # Dados persistidos do MySQL
├── src/ # Código-fonte da aplicação
├── .env # Arquivo de configuração de variáveis de ambiente
├── docker-compose.yml # Arquivo de configuração do Docker Compose
├── Dockerfile # Dockerfile para construir a imagem da aplicação
└── README.md # Documentação do projeto
```

### Acessando a documentação da API

Com o projeto rodando, basta jogar no navegador: http://localhost:3000/docs/routes ou o link com a devida porta que foi configurada no projeto.

O projeto conta com a documentação desenvolvida no swagger, com auxilio do **adonis-autoswagger** que ajuda a manter a documentação dinâmica e sempre atualizada, realização baseada na documentação: https://github.com/ad-on-is/adonis-autoswagger

### Rodando os testes

```bash
node ace test
```

Obs: testes desenvolvidos utilizando o japa (Framework suportado nativamente pelo adonisJS), documentação: https://japa.dev/docs/introduction

## Melhorias Propostas

Para suportar grandes volumes de acessos e garantir a escalabilidade da aplicação, proponho as seguintes melhorias:

### 1. Cache

Com o aumento significativo do tráfego na aplicação, é altamente recomendável a implantação de uma camada de cache. Sugiro o uso do Redis para criar duas tabelas chave-valor distintas:

1. **Tabela de Armazenamento de Chaves Encurtadas**:

   - **Proposta**: Armazenar as URLs encurtadas e suas respectivas URLs originais no Redis.
   - **Motivo**: Minimizar o tempo de busca no banco de dados para URLs que são acessadas com muita frequência, melhorando a performance e reduzindo a carga no banco de dados relacional.

2. **Tabela de Combinações Únicas para URLs**:
   - **Proposta**: Pré-gerar e armazenar combinações únicas de chaves encurtadas no Redis.
   - **Motivo**: A geração de URLs únicas pode se tornar um gargalo, especialmente à medida que o número de URLs aumenta. Para evitar múltiplas tentativas de geração de chaves e consequentes consultas ao banco de dados, é aconselhável gerar essas chaves de forma antecipada e armazená-las em cache. Conforme as chaves são utilizadas, elas são removidas da tabela. Esse processo pode ser automatizado por meio de um cron job ou de um timer no código.

### 2. Limpeza de Banco de Dados

Para diminuir a probabilidade de colisões de chaves e manter a performance da aplicação, sugiro implementar uma estratégia de limpeza das URLs que não são acessadas há muito tempo. Isso pode ser feito de duas maneiras:

1. **Cron Job para Remoção Automática**:

   - **Proposta**: Configurar um cron job que remova URLs antigas que não são acessadas há um período definido (esse período deve ser planejado de acordo com a necessidade da aplicação).
   - **Motivo**: Mantém o banco de dados limpo e reduz a chance de colisão de chaves, além de melhorar a eficiência das consultas.

2. **Remoção Sob Demanda** (Menos Recomendada):
   - **Proposta**: Remover URLs antigas somente quando um usuário tenta acessá-las.
   - **Motivo**: Embora essa abordagem também ajude a limpar URLs obsoletas, ela pode gerar uma experiência negativa para o usuário, pois a remoção ocorre apenas após a tentativa de acesso.

Essas melhorias têm como objetivo otimizar o desempenho da aplicação, reduzir a carga no banco de dados e garantir que a aplicação continue a escalar eficientemente mesmo sob alto volume de acessos.

## Itens realizados:

- Utilizar docker-compose para subir o ambiente completo localmente.
- Ter testes unitários
- API está documentada com OPEN API ou Swagger
- Ter validação de entrada em todos os lugares necessários.
- Ter instrumentação de observabilidade (implementação real ou abstração) de um ou vários tipos:
  - Logs
- Deixar no README pontos de melhoria para caso o sistema necessite escalar horizontalmente e quais serão os maiores desafios.
- Git tags definindo versões de release, por exemplo release 0.1.0 como encurtador criado, 0.2.0 como autenticação, 0.3.0 como operações de usuário no encurtador, 0.4.0 como contabilização de acessos.
- Construir funcionalidades a mais que acredite ser interessante para o “domínio do negócio” da aplicação.
- Definir e assegurar quais versões do NodeJS são aceitas no projeto.
- Configurar pré commit ou pre push hooks.
- Código tolerante a falhas.
