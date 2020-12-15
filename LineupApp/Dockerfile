FROM node AS base

WORKDIR /app

COPY package.json .
RUN npx -p npm@6 npm install

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start" ]
