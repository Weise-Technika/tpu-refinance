FROM oven/bun:latest

WORKDIR /usr/src/app

COPY package.json bun.lockb ./
COPY prisma /usr/src/app/prisma

RUN bun install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "bunx prisma migrate dev&&bun run seed.ts&&bun run index.ts --production"]
