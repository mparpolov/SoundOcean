FROM node:13.12.0-alpine3.11

WORKDIR /app

COPY package.json .
RUN  npm install

COPY  src ./src
COPY  public ./public
COPY  .env .

CMD ["npm", "run", "start-prod"]