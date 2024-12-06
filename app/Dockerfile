# Stage 1: Builder
FROM oven/bun:latest AS builder

WORKDIR /usr/src/app

# ติดตั้ง dependencies ที่จำเป็น
RUN apk add --no-cache python3 build-base libc6-compat

# คัดลอก package.json และ bun.lockb
COPY package.json bun.lockb ./
RUN bun install --production

# คัดลอก source code
COPY . .

# Stage 2: Production
FROM oven/bun:latest

WORKDIR /usr/src/app

# คัดลอก output จาก builder
COPY --from=builder /usr/src/app /usr/src/app

# กำหนดค่า environment และ port
ENV PORT=8080
EXPOSE 8080

CMD ["bun", "astro", "preview", "--host", "--port", "8080"]
