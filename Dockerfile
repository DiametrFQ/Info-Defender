FROM node

COPY . .

RUN npm ci
EXPOSE 8000
CMD npm run start
