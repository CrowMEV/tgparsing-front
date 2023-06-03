FROM node:16.15-alpine
RUN npm install --global serve
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
CMD serve -s /app/build
