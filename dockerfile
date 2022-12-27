# Stage 0, based on Node.js, to build and compile Angular
FROM node:14.15.4-alpine3.12 as node
RUN mkdir /app
WORKDIR /app
ADD package*.json /app/
# RUN apk update && apk upgrade && \
#     apk add --no-cache git
RUN npm install
ADD ./ /app/
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.14.0-alpine
COPY --from=node /app/dist/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf