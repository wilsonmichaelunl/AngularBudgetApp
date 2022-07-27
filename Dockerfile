#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install

ENV NODE_OPTIONS=--max_old_space_size=2048

RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/budget-front-end /usr/share/nginx/html
