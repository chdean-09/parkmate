/*
  Warnings:

  - Added the required column `baseRate` to the `parking_locations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "parking_locations" ADD COLUMN     "baseRate" DOUBLE PRECISION NOT NULL;
