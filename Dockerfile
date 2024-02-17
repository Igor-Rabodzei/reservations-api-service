FROM node:20

WORKDIR /reservations-app

COPY . .

RUN npm install --silent
RUN npm i migrate-mongo -g


EXPOSE 5077
ENTRYPOINT ["npm", "run", "start:dev"]