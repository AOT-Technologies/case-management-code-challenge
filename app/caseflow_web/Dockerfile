# Base image for building the application
FROM node:14.17.0-alpine as build-stage

COPY ./package*.json ./
# Install dependencies
RUN npm install --unsafe-perm --dev
COPY . ./

# Build the application
RUN npm run build

# Intermediate stage for serving the built application
FROM artifacts.developer.gov.bc.ca/redhat-access-docker-remote/ubi8/nginx-122 AS deployer

USER default

# Set the working directory inside the container
WORKDIR /case-flow-web/app

# Copy the built files from the previous stage to Nginx's HTML directory
COPY --from=build-stage /case-flow-web/app/build /usr/share/nginx/html

# Copy Nginx configuration file from the host
COPY /case-flow-web/app/nginx_conf/nginx.conf /etc/nginx/nginx.conf

# Command to start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
