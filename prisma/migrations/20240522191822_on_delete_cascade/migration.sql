-- DropForeignKey
ALTER TABLE "parking_slots" DROP CONSTRAINT "parking_slots_locationId_fkey";

-- AddForeignKey
ALTER TABLE "parking_slots" ADD CONSTRAINT "parking_slots_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "parking_locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
