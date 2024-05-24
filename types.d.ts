import { GridStackNode } from "gridstack";

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

type UserOwnerProps = {
  owner: {
    id: string;
    username: string;
    ownedLocations: any;
    occupiedSlots: any;
    transactions: any;
    wallet: number;
    role: string;
  };
};

interface TransactionProps {
  id: number;
  createdAt: Date;
  name: string;
  amount: number;
  slotId: number | null;
  userId: string;
}

interface GridStackNodeData extends GridStackNode {
  occupied: boolean;
  userId: string;
}
