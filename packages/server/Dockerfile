FROM node:22-alpine3.19

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY ./dist/ ./dist

EXPOSE 8080
CMD ["node", "dist/main.js"]

