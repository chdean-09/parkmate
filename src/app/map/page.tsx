"use client";

import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  Marker,
} from "@react-google-maps/api";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomParkingGrid from "@/components/custom/parkingGrid";

const containerStyle = {
  width: "800px",
  height: "500px",
};

const center: google.maps.LatLngLiteral = {
  lat: 10.730833,
  lng: 122.548056,
};

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAksgo-oo4q40K6c7WKyI-tXKThfrzXzJY",
  });

  const [map, setMap] = useState(null);
  const [clickedPosition, setClickedPosition] =
    useState<null | google.maps.LatLngLiteral>(null);
  const [slotNum, setSlotNum] = useState(0);

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={(event) => {
        console.log("Map clicked");
        console.log(event.latLng!.lat(), event.latLng!.lng());
        setClickedPosition({
          lat: event.latLng!.lat(),
          lng: event.latLng!.lng(),
        });
      }}
    >
      {/* Child components, such as markers, info windows, etc. */}

      {/* <Marker
        position={{
          lat: 10.730833,
          lng: 122.548056
        }}
        zIndex={40}
        icon={{
          path: 'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z',
          fillColor: '#B41412',
          strokeColor: '#0000FF',
          strokeWeight: 6,
          fillOpacity: 1,
          scale: 0.03, //to reduce the size of icons
        }}
      /> */}
      {clickedPosition && (
        <Dialog>
          <DialogTrigger asChild>
            <MarkerF
              position={clickedPosition}
              animation={google.maps.Animation.DROP}
              zIndex={50}
              icon={{
                url: "https://cdn-icons-png.flaticon.com/256/709/709002.png",
                scaledSize: new google.maps.Size(40, 40),
              }}
            />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>parking spot here</DialogTitle>
              <DialogDescription>
                lat: {clickedPosition.lat}, lng: {clickedPosition.lng}. amo ni i
                send sa deytabase
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue="Parking spot for SM"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rate" className="text-right">
                  rate per hour
                </Label>
                <Input id="rate" defaultValue="0" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="slot-num" className="text-right">
                  parking slots
                </Label>
                <Input
                  id="slot-num"
                  defaultValue="0"
                  className="col-span-3"
                  onChange={(event) => setSlotNum(Number(event.target.value))}
                />
              </div>
              <div className="grid items-center border border-black">
                <CustomParkingGrid num={slotNum} />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
  // return <CustomParkingGrid />
}
