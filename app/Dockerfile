FROM oven/bun:latest

WORKDIR /usr/src/app

COPY package.json bun.lockb ./
RUN bun install

COPY . .

RUN bun astro preferences disable devToolbar

ENV PORT=4321
EXPOSE 4321

CMD ["bun", "start"]