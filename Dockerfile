FROM node:21
RUN mkdir -p /var/app
WORKDIR /var/app
COPY . .
RUN npm install
RUN npm run start
EXPOSE 3001
EXPOSE 3306
CMD ["node", "dist/src/main.js"]