FROM node AS base

WORKDIR /app

COPY package.json .
RUN npx -p npm@6 npm install

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start" ]

#--------------------------------------#
FROM base AS builder 

COPY . .
RUN npm run build

#--------------------------------------#
FROM nginx:alpine AS publish
COPY --from=builder /app/build /usr/share/nginx/html
