FROM node:latest
WORKDIR /app
EXPOSE 3000:3000
ADD package*.json ./
RUN npm install --force
ADD . .

CMD npm run dev -- --host