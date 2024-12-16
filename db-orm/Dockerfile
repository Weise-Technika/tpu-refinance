FROM oven/bun:alpine AS builder

WORKDIR /usr/src/app

COPY package.json bun.lockb ./
COPY prisma ./prisma

RUN bun install

COPY . .

FROM oven/bun:alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app /usr/src/app

EXPOSE 3000

ENV NODE_ENV=production

CMD ["bun", "run", "index.ts", "--production"]
