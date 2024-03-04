# FROM nginx:latest
# COPY ./build /usr/share/nginx/html
# COPY ./nginx_conf/nginx.conf /etc/nginx/nginx.conf

FROM nginx:1.17 as production-stage
RUN mkdir /app
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]