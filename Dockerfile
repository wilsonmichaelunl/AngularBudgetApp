#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install

ENV GENERATE_SOURCEMAP false

RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/budget-front-end /usr/share/nginx/html
