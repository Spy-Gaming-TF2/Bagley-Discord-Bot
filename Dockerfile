FROM node:16

WORKDIR /usr/bagley

COPY . .

RUN npm i

CMD ["node", "."]