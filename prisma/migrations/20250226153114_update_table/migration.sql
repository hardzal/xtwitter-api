/*
  Warnings:

  - You are about to drop the column `Images` on the `threads` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "threads" DROP COLUMN "Images",
ADD COLUMN     "images" TEXT[];
