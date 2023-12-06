FROM node:alpine as builder
LABEL authors="freddo"

WORKDIR /app
COPY ./ /app

RUN npm install
RUN npm run build

EXPOSE 3000

ENTRYPOINT ["npm", "start"]