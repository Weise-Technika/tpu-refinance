FROM oven/bun:latest AS builder

WORKDIR /usr/src/app

COPY package.json bun.lockb ./

RUN bun install --production

COPY . .

FROM oven/bun:latest

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app /usr/src/app

EXPOSE 8080

CMD ["bun", "start"]

