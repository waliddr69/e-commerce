FROM node:24-alpine3.21 as base


WORKDIR /app


COPY package*.json ./
RUN npm install


COPY . .

EXPOSE 5000

CMD ["npm","run","dev"]