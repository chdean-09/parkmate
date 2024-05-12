interface ActionResult {
  error: string;
}

interface OccupiedSlot {
  content: string;
  height: number;
  width: number;
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
