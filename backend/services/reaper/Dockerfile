FROM node:13.12.0-alpine3.11

WORKDIR /app

# youtube-dl requires python
RUN apk add python

COPY package.json .
RUN npm install

COPY  src ./src
COPY  .env .

CMD ["npm", "run", "start-prod"]