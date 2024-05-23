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
import {
  Drawer,
  DrawerClose,
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
  const [markerKey, setMarkerKey] = useState(0);
  const [clickedPosition, setClickedPosition] =
    useState<null | google.maps.LatLngLiteral>(null);
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [currentLocation, setCurrentLocation] =
    useState<null | google.maps.LatLngLiteral>(null);
  const [isLoaded, setIsLoaded] = useState(false);

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

            {user.role === "ADMIN" && clickedPosition && (
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
              const occupiedByUser = location.parkingSlots.some(
                (slot) => slot.userId === user.id,
              );
              const locationFull = location.parkingSlots.every(
                (slot) => slot.occupied,
              );
              const availableSlots = location.parkingSlots.filter(
                (slot) => !slot.occupied,
              ).length;

              if (user.role === "ADMIN" && location.ownerId === user.id) {
                return (
                  // if admin sila and they created the location
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
                  // <Dialog key={index}>
                  //   <DialogTrigger asChild>
                  //     <AdvancedMarker
                  //       className="animate-bounce"
                  //       position={{
                  //         lat: location.latitude,
                  //         lng: location.longitude,
                  //       }}
                  //       zIndex={50}
                  //     >
                  //       <Image
                  //         // checks if the user has occupied a slot in the location
                  //         // basically displays normal /marker.png if not occupied and not full ang location
                  //         src={occupiedByUser ?
                  //           "/blue-marker.png" :
                  //           locationFull ?
                  //             "/gray-marker.png"
                  //             : "/marker.png"
                  //         }
                  //         alt="marker"
                  //         width={45}
                  //         height={45}
                  //       />
                  //     </AdvancedMarker>
                  //   </DialogTrigger>
                  //   <DialogContent className="sm:max-w-[425px]">
                  //     {locationFull ? (
                  //       <DialogHeader>
                  //         <DialogTitle>Parking Location Full</DialogTitle>
                  //         <DialogDescription>
                  //           This location is currently full. Please check back
                  //           later.
                  //         </DialogDescription>
                  //       </DialogHeader>
                  //     ) : (
                  //       <>
                  //         <DialogHeader>
                  //           <DialogTitle>Reserve a slot here?</DialogTitle>
                  //           <DialogDescription>
                  //             This action will take you to a separate page where you
                  //             can see the
                  //           </DialogDescription>
                  //         </DialogHeader>
                  //         <DialogFooter>
                  //           <DialogClose asChild>
                  //             <Link
                  //               href={`/editor/${location.latitude}/${location.longitude}`}
                  //             >
                  //               <Button>Confirm</Button>
                  //             </Link>
                  //           </DialogClose>
                  //         </DialogFooter>
                  //       </>
                  //     )}
                  //   </DialogContent>
                  // </Dialog>
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
                              : locationFull
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
                            Date Created:{" "}
                            {location.createdAt.toLocaleDateString()} <br />
                            Base Rate: {location.baseRate} <br />
                            Hourly Rate: {location.hourlyRate} <br />
                            Available Parking Slots: {availableSlots} <br />
                          </DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                          <DialogClose asChild>
                            <Link
                              className="m-auto"
                              href={`/editor/${location.latitude}/${location.longitude}`}
                            >
                              <Button>Reserve Now!</Button>
                            </Link>
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
