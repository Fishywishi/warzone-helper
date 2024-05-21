FROM node:18-alpine

WORKDIR /usr/src/app

COPY yarn.lock ./
COPY package.json ./

RUN apk add --no-cache python3
RUN yarn install --silent

COPY . .

CMD ["yarn", "dev"]