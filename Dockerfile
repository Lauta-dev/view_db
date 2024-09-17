FROM node:22-alpine3.19 AS base
WORKDIR /app

# Instalar supervisor
RUN apk add --no-cache supervisor

# Copy dist project to docker
COPY ./packages/client/dist/ ./client/dist
COPY ./packages/server/dist/ ./server/dist
COPY ./packages/server/package.json .

# Client port
EXPOSE 5000

# Server port
EXPOSE 3000

# http server for client
RUN npm install --verbose -g serve pnpm

# Install deps for prod for nestjs
RUN pnpm install --prod 

COPY ./supervisord.conf /etc/supervisord.conf
CMD ["supervisord", "-c", "/etc/supervisord.conf"]
