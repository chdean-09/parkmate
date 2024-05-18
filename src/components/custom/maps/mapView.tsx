"use client";

import { APIProvider, AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import { useState, CSSProperties } from "react";
import MapHandler from "./mapHandler";
import { CustomMapControl } from "./mapControl";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const containerStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  border: "1px solid black",
};

const center: google.maps.LatLngLiteral = {
  lat: 10.730833,
  lng: 122.548056,
};

export default function MapComponent({
  markerLocations,
}: {
  markerLocations: google.maps.LatLngLiteral[];
}) {
  const [markerKey, setMarkerKey] = useState(0);
  const [clickedPosition, setClickedPosition] =
    useState<null | google.maps.LatLngLiteral>(null);
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [currentLocation, setCurrentLocation] =
    useState<null | google.maps.LatLngLiteral>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  console.log(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);
  console.log(process.env.NEXT_PUBLIC_GOOGLE_MAP_ID);
  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ""}
      onLoad={() => setIsLoaded(true)}
    >
      {isLoaded ? (
        <>
          <Map
            mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
            reuseMaps={true}
            style={containerStyle}
            defaultCenter={center}
            defaultZoom={18}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            onClick={(event) => {
              setClickedPosition(event.detail.latLng);
              setMarkerKey((prevKey) => prevKey + 1);
            }}
          >
            <CustomMapControl
              onPlaceSelect={setSelectedPlace}
              onCurrentLocationSelect={setCurrentLocation}
            />

            {clickedPosition && (
              <Dialog>
                <DialogTrigger asChild>
                  <AdvancedMarker
                    key={markerKey}
                    className="drop"
                    position={clickedPosition}
                    zIndex={50}
                    onClick={(event) => {
                      console.log(event.latLng?.toJSON());
                    }}
                  >
                    <Image
                      src="/marker.png"
                      alt="marker"
                      width={45}
                      height={45}
                    />
                  </AdvancedMarker>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create parking spot here?</DialogTitle>
                    <DialogDescription>
                      This action will take you to a separate page to create a
                      parking spot.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Link
                        href={{
                          pathname: "/editor",
                          query: {
                            lat: clickedPosition.lat,
                            lng: clickedPosition.lng,
                          },
                        }}
                      >
                        <Button>Confirm</Button>
                      </Link>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}

            {markerLocations.map((location, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <AdvancedMarker
                    className="animate-bounce"
                    position={location}
                    zIndex={50}
                    onClick={(event) => {
                      console.log(event.latLng?.toJSON());
                    }}
                  >
                    <Image
                      src="/marker.png"
                      alt="marker"
                      width={45}
                      height={45}
                    />
                  </AdvancedMarker>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>
                      Make changes to this parking spot?
                    </DialogTitle>
                    <DialogDescription>
                      This action will take you to a separate page where you can
                      update the parking spot info.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Link
                        href={{
                          pathname: "/editor",
                          query: {
                            lat: location.lat,
                            lng: location.lng,
                          },
                        }}
                      >
                        <Button>Confirm</Button>
                      </Link>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ))}
          </Map>
          <MapHandler place={selectedPlace} currentLocation={currentLocation} />
        </>
      ) : (
        <Skeleton className="bg-slate-400 w-full h-full border-[1px]" />
      )}
    </APIProvider>
  );
}
