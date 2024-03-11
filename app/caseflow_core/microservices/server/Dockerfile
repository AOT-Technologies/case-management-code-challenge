# RedHat UBI 8 with nodejs 14
FROM registry.access.redhat.com/ubi8/ubi as builder
RUN dnf module install -y nodejs:14

# Install packages, build and keep only prod packages
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build
# --only=prod
RUN npm ci --only=prod  
    #&& npm run build

# Deployment container
FROM node:lts-alpine
WORKDIR /app
# Set node to production
ENV NODE_ENV production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expose port 
EXPOSE 7001

# Grant access to group 0 to allow npm v9 to work
# See: https://docs.openshift.com/container-platform/4.11/openshift_images/create-images.html#use-uid_create-images
RUN chgrp -R 0 /app && \
    chmod -R g=u /app

# Start up command, with max heap size as 50Megs
ENTRYPOINT ["node", "--max-old-space-size=256","dist/main"]
