"use client";

import DisplayMapDetails from "@/components/custom/maps/displayMap";
import Search from "@/components/custom/search";
import { SkeletonMap } from "@/components/custom/skeletonUI/mapSkeleton";
import { useEffect, useState } from "react";
import { fetchDataMap } from "@/lib/mapData";

const mockParkingSlotNumber: number = 3;

interface GoogleMapData {
  location: string;
  city: string;
  parkingSpotName: string;
}

export default function Home() {
  const [dataMap, setDataMap] = useState<GoogleMapData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mapData = await fetchDataMap();
        setDataMap(mapData);
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="flex h-screen flex-col items-center px-3">
      <div className="w-full md:w-auto mb-3">
        <Search placeholder={"Search for parking locations nearby"} />
      </div>

      {dataMap ? (
        <DisplayMapDetails
          mapData={dataMap}
          parkingSlot={mockParkingSlotNumber}
        />
      ) : (
        <SkeletonMap />
      )}
    </main>
  );
}
