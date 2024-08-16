FROM node:lts-alpine

WORKDIR /home/api

COPY package.json .

COPY ./build .

EXPOSE 3000

CMD ["node", "server.js"]
