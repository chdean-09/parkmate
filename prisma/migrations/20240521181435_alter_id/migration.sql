/*
  Warnings:

  - The primary key for the `parking_slots` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_slotId_fkey";

-- AlterTable
ALTER TABLE "parking_slots" DROP CONSTRAINT "parking_slots_pkey",
ADD COLUMN     "unique_id" SERIAL NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "parking_slots_pkey" PRIMARY KEY ("unique_id");
DROP SEQUENCE "parking_slots_id_seq";

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "parking_slots"("unique_id") ON DELETE SET NULL ON UPDATE CASCADE;
