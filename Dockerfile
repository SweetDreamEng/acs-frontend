FROM ubuntu as intermediate

# install git
RUN apt-get update
RUN apt-get install -y git

# add credentials on build
ARG SSH_PRIVATE_KEY
ARG GIT_USERNAME

RUN mkdir /root/.ssh/
RUN echo "${SSH_PRIVATE_KEY}" > /root/.ssh/id_rsa

RUN chmod 600 /root/.ssh/id_rsa

# make sure your domain is accepted
RUN touch /root/.ssh/known_hosts
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts

RUN git clone git@github.com:${GIT_USERNAME}/acs-frontend.git

FROM node:lts-alpine
# copy the repository form the previous image
COPY --from=intermediate /acs-frontend /var/www/html/acs-frontend

WORKDIR /var/www/html/acs-frontend
RUN npm install
EXPOSE 8080
CMD ["npm", "run", "serve"]