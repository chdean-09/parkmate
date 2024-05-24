"use client";

import { APIProvider, AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import { useState, CSSProperties, useEffect } from "react";
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
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User } from "lucia";
import { User as dbUser } from "@prisma/client";
import { ParkingLocation, ParkingSlot } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";

import Directions from "./directions";
import { convertToPhPesoFormat } from "@/utils/convertToPhPesoFormat";

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
  user,
  markerInfo,
}: {
  user: User;
  markerInfo: ({
    parkingSlots: ParkingSlot[];
  } & {
    owner: dbUser;
  } & ParkingLocation)[];
}) {
  const { toast } = useToast();

  const [markerKey, setMarkerKey] = useState(0);
  const [clickedPosition, setClickedPosition] =
    useState<null | google.maps.LatLngLiteral>(null);
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [currentLocation, setCurrentLocation] =
    useState<null | google.maps.LatLngLiteral>(null);
  const [showDirections, setShowDirections] = useState<{
    isVisible: boolean;
    latitude: number;
    longitude: number;
  }>({ isVisible: false, latitude: 10.730833, longitude: 122.548056 });
  const [directionDetails, setDirectionDetails] = useState<{
    summary: string;
    distance: string;
    duration: string;
  } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (directionDetails) {
      toast({
        duration: 15000,
        title: `${directionDetails.summary}`,
        description: `Distance: ${directionDetails.distance}, Duration: ${directionDetails.duration}`,
      });
    }
  }, [directionDetails, toast]);

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

            {showDirections.isVisible && (
              // displays the direction from a place to another
              <Directions
                latitude={showDirections.latitude}
                longitude={showDirections.longitude}
                setDirectionDetails={setDirectionDetails}
              />
            )}

            {user.role === "ADMIN" && clickedPosition && (
              // if the user is an admin, they can create parking locations
              <Dialog>
                <DialogTrigger asChild>
                  <AdvancedMarker
                    key={markerKey}
                    className="drop"
                    position={clickedPosition}
                    zIndex={50}
                  >
                    <Image
                      src="/yellow-marker.png"
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
                        href={`/editor/${clickedPosition.lat}/${clickedPosition.lng}`}
                      >
                        <Button>Confirm</Button>
                      </Link>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}

            {markerInfo.map((location, index) => {
              // displays all the markers throughout the map
              const occupiedByUser = location.parkingSlots.some(
                (slot) => slot.userId === user.id,
              );
              const availableSlots = location.parkingSlots.filter(
                (slot) => !slot.occupied,
              ).length;

              if (user.role === "ADMIN" && location.ownerId === user.id) {
                return (
                  // if admin sila and they own/created the location
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <AdvancedMarker
                        className="animate-bounce"
                        position={{
                          lat: location.latitude,
                          lng: location.longitude,
                        }}
                        zIndex={50}
                      >
                        <Image
                          src="/yellow-marker.png"
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
                          This action will take you to a separate page where you
                          can update the parking spot info.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Link
                            href={`/editor/${location.latitude}/${location.longitude}`}
                          >
                            <Button>Confirm</Button>
                          </Link>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                );
              } else {
                return (
                  // even if user is an admin, they can still reserve spots
                  <Drawer key={index}>
                    <DrawerTrigger asChild>
                      <AdvancedMarker
                        className="animate-bounce"
                        position={{
                          lat: location.latitude,
                          lng: location.longitude,
                        }}
                        zIndex={50}
                      >
                        <Image
                          // checks if the user has occupied a slot in the location
                          // basically displays normal /marker.png if not occupied and not full ang location
                          src={
                            occupiedByUser
                              ? "/blue-marker.png"
                              : availableSlots === 0
                                ? "/gray-marker.png"
                                : "/marker.png"
                          }
                          alt="marker"
                          width={45}
                          height={45}
                        />
                      </AdvancedMarker>
                    </DrawerTrigger>
                    <DrawerContent className="mx-auto max-w-xl">
                      <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                          <DrawerTitle>
                            {location.name.toLocaleUpperCase()}
                          </DrawerTitle>
                          <DrawerDescription>
                            Owner: {location.owner.username} <br />
                            Base Rate:{" "}
                            {convertToPhPesoFormat(location.baseRate)} <br />
                            Hourly Rate:{" "}
                            {convertToPhPesoFormat(location.hourlyRate)} <br />
                            Available Parking Slots: {availableSlots} <br />
                          </DrawerDescription>
                        </DrawerHeader>
                        {availableSlots === 0 && !occupiedByUser && (
                          <p className="text-sm text-red-500">
                            This location is currently full. Please check back
                            later.
                          </p>
                        )}
                        <DrawerFooter className="flex flex-row">
                          {availableSlots > 0 || occupiedByUser ? (
                            <>
                              <DialogClose asChild>
                                <Link
                                  className="m-auto"
                                  href={`/reserve/${location.latitude}/${location.longitude}`}
                                >
                                  <Button className="bg-green-700 hover:bg-green-600">
                                    Reserve Now!
                                  </Button>
                                </Link>
                              </DialogClose>
                            </>
                          ) : (
                            <Button
                              className="m-auto bg-green-700 hover:bg-green-600"
                              disabled
                            >
                              Reserve Now!
                            </Button>
                          )}

                          <DialogClose asChild>
                            <Button
                              className="m-auto"
                              onClick={() =>
                                setShowDirections({
                                  isVisible: !showDirections.isVisible,
                                  latitude: location.latitude,
                                  longitude: location.longitude,
                                })
                              }
                            >
                              {showDirections.isVisible
                                ? "Close Directions"
                                : "Get Directions"}
                            </Button>
                          </DialogClose>
                        </DrawerFooter>
                      </div>
                    </DrawerContent>
                  </Drawer>
                );
              }
            })}
          </Map>
          <MapHandler place={selectedPlace} currentLocation={currentLocation} />
        </>
      ) : (
        <Skeleton className="bg-slate-400 w-full h-full border-[1px]" />
      )}
    </APIProvider>
  );
}
