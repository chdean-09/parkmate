import React from "react";
import { ControlPosition, MapControl } from "@vis.gl/react-google-maps";
import Image from "next/image";

import { PlaceAutocompleteClassic } from "./autocomplete";

type CustomAutocompleteControlProps = {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  onCurrentLocationSelect: (location: google.maps.LatLngLiteral | null) => void;
};

export function CustomMapControl({
  onPlaceSelect,
  onCurrentLocationSelect,
}: CustomAutocompleteControlProps) {
  return (
    <MapControl position={ControlPosition.TOP_CENTER}>
      <div className="flex flex-row gap-2 w-56 sm:w-96 mt-2">
        <PlaceAutocompleteClassic onPlaceSelect={onPlaceSelect} />
        <Image
          src="/getlocation.png"
          alt="search icon"
          width={40}
          height={40}
          className="cursor-pointer bg-red-300 p-1 rounded-lg"
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {
                  const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  };

                  onCurrentLocationSelect(pos);
                  console.log(pos, "huli ka");
                },
                () => {
                  console.log("Error: The Geolocation service failed.");
                },
              );
            } else {
              // Browser doesn't support Geolocation
              console.log("Browser doesn't support Geolocation");
            }
          }}
        />
      </div>
    </MapControl>
  );
}
