interface ActionResult {
  error: string;
}

interface OccupiedSlot {
  id: string;
  content: string;
  x: number;
  y: number;
  locationId: number;
}

interface OwnedLocation {
  createdAt: string;
  updatedAt: string?;
  latitude: number;
  longitude: number;
  name: string;
  hourlyRate: number;
}

type UserProps = {
  user: {
    username: string;
    ownedLocations: any; // edit later
    occupiedSlots: any; // edit later
    id: string;
  };
};
