FROM node:14.18.0-alpine

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE ${SERVER_PORT}

CMD [ "npm", "run", "dev" ]
