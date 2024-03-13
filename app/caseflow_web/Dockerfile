# Use official Node.js image as the base image
FROM node:latest AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Use Nginx image as the base image for the production environment
FROM nginx:latest

# Copy the built React app from the build stage to the nginx html directory
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx_conf/nginx.conf /etc/nginx/nginx.conf

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
