FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package manifests for server and install dependencies
COPY server/package*.json ./server/
RUN cd server && npm ci --only=production

# Copy the rest of the application
COPY . .

WORKDIR /app/server

ENV NODE_ENV=production
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
