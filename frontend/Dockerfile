FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN npm set strict-ssl false && npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
