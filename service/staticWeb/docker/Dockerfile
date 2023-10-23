FROM node:20-slim

WORKDIR /app

COPY ./service/webServer/src/package.json /app/

RUN yarn install

COPY ./service/webServer/src /app

