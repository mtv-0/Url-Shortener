# Usar a imagem oficial do Node.js
FROM node:lts-alpine

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /home/api

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Expor a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
