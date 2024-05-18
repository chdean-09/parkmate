import DisplayMapDetails from "@/components/custom/maps/displayMap";
import Search from "@/components/custom/search";
import { SkeletonMap } from "@/components/custom/skeletonUI/mapSkeleton";
import { useEffect, useState } from "react";
import { fetchDataMap } from "@/lib/mapData";
import MapComponent from "@/components/custom/maps/mapView";
import { Suspense } from "react";

const mockParkingSlotNumber: number = 3;

interface GoogleMapData {
  location: string;
  city: string;
  parkingSpotName: string;
}

const markerLocations: google.maps.LatLngLiteral[] = [
  { lat: 10.730833, lng: 122.548056 },
  { lat: 10.730947804777555, lng: 122.54912967652788 },
  { lat: 10.7312078214488, lng: 122.54798526640617 },
  { lat: 10.72991677874751, lng: 122.54860578371651 },
];

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center px-3">
      <div className="w-[95%] sm:w-[80%] h-full mb-3">
        <MapComponent markerLocations={markerLocations} />
      </div>
    </main>
  );
}
