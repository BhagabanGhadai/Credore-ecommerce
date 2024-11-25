# Use the official Node.js image.
FROM node:20-alpine

# Set the working directory inside the container to /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY src/ ./src

# Copy the .env.sample file and rename it to .env
COPY .env /usr/src/app/.env

# Run Prisma migrations for development
# RUN npm run migrate:dev

# Run Prisma migrations for production
RUN npm run migrate

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
