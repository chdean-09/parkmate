import { User } from "lucia";
import { ParkingLocation, ParkingSlot } from "@prisma/client";
import CustomParkingGrid from "./parkingGrid";
import { convertToPhPesoFormat } from "@/utils/convertToPhPesoFormat";

export default function ReservationForm({
  user,
  fetchedData,
}: {
  user: User;
  fetchedData: ParkingLocation & { parkingSlots: ParkingSlot[] };
}) {
  return (
    <div className="w-[95%] flex flex-col items-center">
      <div>Wallet: {convertToPhPesoFormat(user.wallet)}</div>
      <div>Base Rate: {convertToPhPesoFormat(fetchedData.baseRate)}</div>
      <div>Hourly Rate: {convertToPhPesoFormat(fetchedData.hourlyRate)}</div>
      <div className="w-full my-3">
        Click on the parking spot to reserve it
        <CustomParkingGrid
          user={user}
          data={fetchedData}
          alreadyCreated={true}
          layout={fetchedData.parkingSlots}
        />
      </div>
    </div>
  );
}
