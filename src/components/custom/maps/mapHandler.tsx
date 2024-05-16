import { useMap } from "@vis.gl/react-google-maps";
import React, { useEffect } from "react";

interface Props {
  place: google.maps.places.PlaceResult | null;
  currentLocation: google.maps.LatLngLiteral | null;
}

const MapHandler = ({ place, currentLocation }: Props) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    if (place && place.geometry?.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else if (currentLocation) {
      map.panTo(currentLocation);
    }
  }, [map, place, currentLocation]);

  return null;
};

export default React.memo(MapHandler);
