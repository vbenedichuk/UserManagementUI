FROM node:13.13.0-alpine AS builder
COPY . ./build-folder
WORKDIR /build-folder
RUN npm i
RUN $(npm bin)/ng build --prod

FROM nginx:1.16.1-alpine
COPY --from=builder /build-folder/nginx/default.conf /etc/nginx/conf.d/
COPY --from=builder /build-folder/dist/UserManagement/ /usr/share/nginx/html