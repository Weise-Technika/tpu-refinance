# Stage 1: Build
# FROM oven/bun:latest AS build

# WORKDIR /usr/src/app

# COPY package.json bun.lockb ./
# RUN bun install --production

# COPY . .

# RUN bun astro preferences disable devToolbar

# # Stage 2: Production
# FROM node:alpine

# WORKDIR /usr/src/app

# COPY --from=build /usr/src/app /usr/src/app

# ENV PORT=8080
# EXPOSE 8080

# CMD ["bun", "start", "--production"]
# Stage 1: Build
FROM oven/bun:alpine AS build

WORKDIR /usr/src/app

# Copy dependencies and install
COPY package.json bun.lockb ./
RUN bun install --production

# Copy source files
COPY . .

# Disable dev toolbar for Astro
RUN bun astro preferences disable devToolbar

# Stage 2: Production
FROM oven/bun:alpine

WORKDIR /usr/src/app

# Copy built files from build stage
COPY --from=build /usr/src/app /usr/src/app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Expose the application port
EXPOSE 8080

# Command to run the application
CMD ["bun", "start", "--production"]