FROM node:latest

WORKDIR /app

EXPOSE 80:3000

COPY . .
RUN npm i

CMD npm run dev