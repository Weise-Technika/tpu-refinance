# Stage 1: Build
# FROM oven/bun:latest AS builder

# WORKDIR /usr/src/app

# COPY package.json bun.lockb ./
# COPY prisma ./prisma

# RUN bun install

# COPY . .

# # Stage 2: Production
# FROM node:alpine

# WORKDIR /usr/src/app

# COPY --from=builder /usr/src/app /usr/src/app

# EXPOSE 3000

# CMD ["sh", "-c", "bun run index.ts --production"]

# Stage 1: Build
FROM oven/bun:alpine AS builder

WORKDIR /usr/src/app

# Copy dependencies and install
COPY package.json bun.lockb ./
COPY prisma ./prisma

# Install dependencies
RUN bun install

# Generate Prisma client
#RUN npx prisma generate

# Copy source files
COPY . .

# Stage 2: Production
FROM oven/bun:alpine

WORKDIR /usr/src/app

# Copy built files from builder stage
COPY --from=builder /usr/src/app /usr/src/app

# Expose application port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Command to run the application
CMD ["bun", "run", "index.ts", "--production"]
