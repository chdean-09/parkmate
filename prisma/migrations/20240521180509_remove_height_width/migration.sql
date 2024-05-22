/*
  Warnings:

  - You are about to drop the column `height` on the `parking_slots` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `parking_slots` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "parking_slots" DROP COLUMN "height",
DROP COLUMN "width";
