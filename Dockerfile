# Base image
ARG REGISTRY=docker.io/library
FROM ${REGISTRY}/node:20.19.0 AS builder

# Set working directory
WORKDIR /dui

RUN npm config set maxsockets 3 \
    && npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retry-maxtimeout 120000

# Copy project files
COPY . .

RUN npm ci --no-audit

# Build the Next.js application
RUN npm run build

# Expose port
EXPOSE 9699

# Start the application
CMD ["npm", "start"]
