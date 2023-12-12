FROM node:21-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

RUN npm run build

# Expose the port that the Nest.js application will run on
EXPOSE 3001

# Start the Nest.js application
CMD [ "node", "dist/main.js" ]
# CMD ["npm", "start"]
