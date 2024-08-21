# Base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base as deps
WORKDIR /app

# Install required packages for building native dependencies
RUN apk add --no-cache libc6-compat g++ make python3
COPY package.json package-lock.json* ./
RUN npm ci --production

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Remove development dependencies and build tools to save space
RUN apk del g++ make python3

# Set the environment to production
ENV NODE_ENV=production

# Expose the port your app runs on (if needed)
EXPOSE 4000

# Command to start the GraphQL Mesh gateway
CMD ["npm", "start"]
