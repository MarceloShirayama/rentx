FROM node:16.13.0-alpine

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE ${SERVER_PORT}

CMD [ "npm", "run", "dev" ]
