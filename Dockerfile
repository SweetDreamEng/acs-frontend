# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# production stage
FROM nginx:1.16 as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./sourcefiles/nginx/conf.d/proxy-vue.conf /etc/nginx/conf.d
EXPOSE 8080:8080
CMD ["nginx", "-g", "daemon off;"]
