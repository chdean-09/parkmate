import DisplayMapDetails from "@/components/custom/maps/displayMap";
import Search from "@/components/custom/search";
import Image from "next/image";

const mockMapData = {
  location: "Latitude, Longitude",
  city: "Your City",
  parkingSpotName: "W Car Park",
};

const mockParkingSlotNumber: number = 3;

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center px-3">
      <div className="w-full md:w-auto mb-3">
        <Search placeholder={"Search for parking locations nearby"} />
      </div>
      <DisplayMapDetails
        mapData={mockMapData}
        parkingSlot={mockParkingSlotNumber}
      />
    </main>
  );
}
