FROM node:lts-alpine
WORKDIR /var/www/html/acs-frontend
COPY package*.json ./
RUN  npm install
EXPOSE 8080
CMD ["npm", "run", "dev"]
