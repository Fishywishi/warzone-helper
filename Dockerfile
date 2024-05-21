FROM node:18-alpine

WORKDIR /usr/src/app

COPY yarn.lock ./
COPY package.json ./

RUN apk add --no-cache --virtual .build-deps alpine-sdk python3
RUN yarn install --silent
RUN apk del .build-deps

COPY . .

CMD ["yarn", "dev"]