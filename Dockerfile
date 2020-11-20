FROM node:lts-alpine
WORKDIR /acs-frontend
COPY package.json ./
RUN  npm install
EXPOSE 8080
CMD ["npm", "run", "serve"]