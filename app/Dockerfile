FROM oven/bun:latest

WORKDIR /usr/src/app

COPY package.json bun.lockb ./
RUN bun install

COPY . .

RUN bun astro preferences disable devToolbar

ENV PORT=443
EXPOSE 443

CMD ["bun", "start"]