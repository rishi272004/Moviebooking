# Use lightweight Alpine Linux with Node 18
FROM node:18-alpine

WORKDIR /app

# Copy package files and install ONLY production dependencies
# Using npm ci for clean install (faster, more reliable than npm install)
COPY server/package*.json ./server/
RUN cd server && npm ci --only=production

# Copy server source code
COPY server ./server

# Set production environment (disables debug logging)
ENV NODE_ENV=production

# Expose port 3000 for backend API
EXPOSE 3000

# Start server
CMD ["node", "server/server.js"]
