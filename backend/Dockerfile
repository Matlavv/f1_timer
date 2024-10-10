FROM node:20

WORKDIR /src

COPY package*.json ./

RUN npm set strict-ssl false && npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["node", "dist/app.js"]
