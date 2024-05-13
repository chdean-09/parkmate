interface GoogleMapData {
  location: string;
  city: string;
  parkingSpotName: string;
}

export async function fetchDataMap(): Promise<GoogleMapData[]> {
  try {
    return new Promise<GoogleMapData[]>((resolve) => {
      setTimeout(() => {
        const googleMapPromise: GoogleMapData[] = [
          {
            location: "Latitude, Longitude",
            city: "Your City",
            parkingSpotName: "W Car Park",
          },
        ];
        resolve(googleMapPromise);
      }, 2000); // Mock delay of 2 seconds (2000 milliseconds)
    });
  } catch (error) {
    throw new Error("Error fetching map data");
  }
}
