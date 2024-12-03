FROM node:20

WORKDIR /src

COPY package*.json ./
RUN npm set strict-ssl false && npm install

COPY . .

RUN npm run build

USER node

EXPOSE 3002

CMD ["node", "dist/app.js"]
