-- CreateTable
CREATE TABLE "customer_data" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "car_id" TEXT NOT NULL,
    "firstCalData" JSONB NOT NULL,
    "secondCalData" JSONB NOT NULL,
    "salesOwner" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_data_pkey" PRIMARY KEY ("id")
);
