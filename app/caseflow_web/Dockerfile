# base image
FROM node:14.17.0-alpine as build-stage

# set working directory
WORKDIR /case-flow-web/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /case-flow-web/app/node_modules/.bin:$PATH

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

# install and cache app dependencies
COPY package-lock.json /case-flow-web/app/package-lock.json
COPY package.json /case-flow-web/app/package.json

RUN npm install --unsafe-perm --dev
#RUN npm install react-scripts@3.0.1 -g --silent

COPY . /case-flow-web/app/

RUN npm run build
# Stage 2: Serve React App with NGINX
FROM nginx:alpine as production-stage

COPY --from=build-stage /case-flow-web/app/build /usr/share/nginx/html

COPY ./nginx_conf/nginx.conf /etc/nginx/nginx.conf

# Fix permissions for Nginx directories
RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 770 /var/cache/nginx /var/run /var/log/nginx

# Allow Nginx to bind to port 80
USER root

CMD ["nginx", "-g", "daemon off;"]
