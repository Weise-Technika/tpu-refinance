FROM oven/bun:latest

WORKDIR /usr/src/app

COPY package.json bun.lockb ./
COPY prisma ./prisma
RUN bun install

COPY . .

RUN bunx prisma generate

EXPOSE 3000

CMD ["bun", "run", "start"]
