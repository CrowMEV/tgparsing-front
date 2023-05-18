FROM node:current-alpine as builder
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . .
RUN npm run build
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]