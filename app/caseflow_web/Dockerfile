# Base image for building the application
FROM node:14.17.0-alpine as build-stage

# Set the working directory inside the container
WORKDIR /case-flow-web/app

# Copy only the package.json and package-lock.json files to leverage Docker caching
COPY package-lock.json package.json /case-flow-web/app/

# Install dependencies
RUN npm install --unsafe-perm --dev

# Copy the entire application code
COPY . /case-flow-web/app/

# Build the application
RUN npm run build

# Intermediate stage for serving the built application
FROM nginx:latest as production-stage

# Copy the built files from the previous stage to Nginx's HTML directory
COPY --from=build-stage /case-flow-web/app/build /usr/share/nginx/html

# Copy Nginx configuration file from the host
COPY ./nginx_conf/nginx.conf /etc/nginx/nginx.conf

# Command to start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
