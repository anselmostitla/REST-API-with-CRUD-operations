FROM node:alpine

WORKDIR /appNode

COPY package*.json .

RUN npm ci

COPY . .

CMD ["node", "index.js"]