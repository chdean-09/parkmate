"use client";

import { useEffect, useState } from "react";

import { useMapsLibrary, useMap } from "@vis.gl/react-google-maps";

export default function Directions({
  latitude,
  longitude,
  setDirectionDetails,
}: {
  latitude: number;
  longitude: number;
  setDirectionDetails: ({
    summary,
    distance,
    duration,
  }: {
    summary: string;
    distance: string;
    duration: string;
  }) => void;
}) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const [myLocation, setMyLocation] = useState<google.maps.LatLngLiteral>({
    lat: 10.730833,
    lng: 122.548056,
  }); // cpu location
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          setMyLocation(pos);
          setDirectionsService(new routesLibrary.DirectionsService());
          setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
        },
        () => {
          setDirectionsService(new routesLibrary.DirectionsService());
          setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
          console.log("Error: The Geolocation service failed.");
        },
      );
    } else {
      // Browser doesn't support Geolocation
      setDirectionsService(new routesLibrary.DirectionsService());
      setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
      console.log("Browser doesn't support Geolocation");
    }
  }, [routesLibrary, map]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: { lat: myLocation.lat, lng: myLocation.lng },
        destination: { lat: latitude, lng: longitude },
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
        setDirectionDetails({
          summary: response.routes[0].summary,
          distance: response.routes[0].legs[0].distance?.text || "",
          duration: response.routes[0].legs[0].duration?.text || "",
        });
      });

    return () => directionsRenderer.setMap(null);
  }, [
    directionsService,
    directionsRenderer,
    myLocation.lat,
    myLocation.lng,
    latitude,
    longitude,
    setDirectionDetails,
  ]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;
}
