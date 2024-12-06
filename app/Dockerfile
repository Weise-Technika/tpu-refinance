# Stage 1: Build
FROM oven/bun:alpine AS builder

WORKDIR /usr/src/app

COPY package.json bun.lockb ./
RUN bun install --production

COPY . .

RUN bun astro preferences disable devToolbar

# Stage 2: Production
FROM oven/bun:alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app /usr/src/app

ENV PORT=8080
EXPOSE 8080

CMD ["bun", "start", "--production"]