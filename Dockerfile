FROM node:latest

WORKDIR /app

EXPOSE 80:3000

ADD package*.json ./
RUN npm ci
ADD . .

CMD npm run dev