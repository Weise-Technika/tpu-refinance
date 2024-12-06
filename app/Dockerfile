FROM oven/bun:latest

WORKDIR /usr/src/app

COPY package.json bun.lockb ./

RUN bun install --production

COPY . .

EXPOSE 8080

CMD ["bun", "start"]
