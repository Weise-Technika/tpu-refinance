/*
  Warnings:

  - Added the required column `group` to the `finance_price` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "finance_price" ADD COLUMN     "group" TEXT NOT NULL;
