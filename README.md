# tpu-refinance

แก้ใขไฟล์ docker composer ให้ถูกต้องและใช้คำสั่ง
- ตั้งค่า Password Database 
- ตั้งค่า env => database connection ให้ถูกต้อง
```bash docker-compose up -d```

ทำการ migrate ข้อมูลเข้าฐานข้อมูลจาก prisma
```docker exec -it prisma bun astro migrate dev```

เพิ่มข้อมูลด้วย seed.ts ใน prisma
```docker exec -it prisma bun run seed.ts```

กรณีรัน Production ให้ใช้คำสั่งมห้ติดตั้ง Certificate ให้เรียบร้อย

