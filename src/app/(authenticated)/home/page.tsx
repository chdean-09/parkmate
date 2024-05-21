import prisma from "@/lib/db";
import MapComponent from "@/components/custom/maps/mapView";

const fetchedMarkers = await prisma.parkingLocation.findMany({
  select: {
    latitude: true,
    longitude: true,
  },
});

const markerLocations: google.maps.LatLngLiteral[] = fetchedMarkers.map(
  (location) => ({
    lat: location.latitude,
    lng: location.longitude,
  }),
);

// console.log(fetchedMarkers, 'markerLocations')
// const markerLocations: google.maps.LatLngLiteral[] = [
//   { lat: 10.730833, lng: 122.548056 },
//   { lat: 10.730947804777555, lng: 122.54912967652788 },
//   { lat: 10.7312078214488, lng: 122.54798526640617 },
//   { lat: 10.72991677874751, lng: 122.54860578371651 },
// ];

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center px-3">
      <div className="w-[95%] sm:w-[80%] h-full mb-3">
        <MapComponent markerLocations={markerLocations} />
      </div>
    </main>
  );
}
