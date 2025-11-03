FROM node:18-alpine

WORKDIR /app

# Copy only server package files and install dependencies
COPY server/package*.json ./server/
RUN cd server && npm ci --only=production

# Copy only server code (exclude client and k8s)
COPY server ./server

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "server/server.js"]
