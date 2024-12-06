FROM oven/bun:alpine

WORKDIR /usr/src/app

COPY package.json bun.lockb ./
RUN bun install --production

COPY . .

RUN bun astro preferences disable devToolbar

ENV PORT=8080
EXPOSE 8080

CMD ["bun", "start", "--production"]