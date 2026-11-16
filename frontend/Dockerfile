# build do React
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# nome do front, vem do docker-compose e entra no build
ARG VITE_SERVIDOR
ENV VITE_SERVIDOR=$VITE_SERVIDOR
RUN npm run build

# só os arquivos prontos vão pro nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
