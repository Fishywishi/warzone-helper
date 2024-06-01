FROM node:18-alpine

WORKDIR /usr/src/app

COPY yarn.lock ./
COPY package.json ./

RUN echo "https://dl-cdn.alpinelinux.org/alpine/v3.15/community"  >> /etc/apk/repositories
# RUN apk add python2 make g++ && rm -rf /var/cache/apk/*
RUN apk add --no-cache --virtual .build-deps alpine-sdk python2 make g++
RUN yarn install
RUN apk del .build-deps

COPY . .

CMD ["yarn", "dev"]