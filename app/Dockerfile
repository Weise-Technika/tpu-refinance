FROM oven/bun:alpine AS builder

WORKDIR /usr/src/app

COPY package.json bun.lockb ./

RUN bun install --production

COPY . .

# Stage 2: Production
FROM oven/bun:alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app /usr/src/app

ENV PORT=8080

EXPOSE 8080

CMD ["bun", "start", "--production"]
# # Stage 1: Builder
# FROM oven/bun:latest AS builder

# WORKDIR /usr/src/app
# # Copy package.json and bun.lockb
# COPY package.json bun.lockb ./
# RUN bun install --frozen-lockfile

# # Copy source code
# COPY . .

# # Stage 2: Production
# FROM oven/bun:latest

# WORKDIR /usr/src/app

# # Copy output from builder
# COPY --from=builder /usr/src/app /usr/src/app

# # Set environment and port
# ENV PORT=8080
# EXPOSE 8080

# CMD ["bun", "astro", "start"]
