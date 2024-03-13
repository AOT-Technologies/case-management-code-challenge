# base image
FROM node:14.17.0-alpine as build-stage

# set working directory
WORKDIR /case-flow-web/app

ARG NODE_ENV
ARG REACT_APP_KEYCLOAK_CLIENT
ARG REACT_APP_KEYCLOAK_URL_REALM
ARG REACT_APP_KEYCLOAK_URL

ENV NODE_ENV ${NODE_ENV}
ENV REACT_APP_API_SERVER_URL ${REACT_APP_API_SERVER_URL}
ENV REACT_APP_KEYCLOAK_CLIENT ${REACT_APP_KEYCLOAK_CLIENT}
ENV REACT_APP_KEYCLOAK_URL_REALM ${REACT_APP_KEYCLOAK_URL_REALM}
ENV REACT_APP_KEYCLOAK_URL ${REACT_APP_KEYCLOAK_URL}


# add `/app/node_modules/.bin` to $PATH
ENV PATH /case-flow-web/app/node_modules/.bin:$PATH

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

# install and cache app dependencies

COPY package-lock.json /case-flow-web/app/package-lock.json
COPY package.json /case-flow-web/app/package.json

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# create and set user permissions to app folder
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

# add app files
COPY . ./

RUN npm run build

FROM nginx:latest as production-stage
RUN mkdir /app
COPY --from=build-stage /case-flow-web/app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
